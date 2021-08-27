import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/api/app';
import { password } from '../mocks/usersMake';

describe('endpoint para acesso de usuários a API "/login"', () => {
  let connection: Connection;
  let userMake: any;

  beforeAll(async () => {
    connection = await createConnection('test-app-ioasys');
    await connection.query('DROP TABLE IF EXISTS user_tokens CASCADE');
    await connection.query('DROP TABLE IF EXISTS users CASCADE');
    await connection.query('DROP TABLE IF EXISTS migrations CASCADE');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM user_tokens CASCADE');
    await connection.query('DELETE FROM users CASCADE');
    await connection.query(
      `INSERT INTO users (name, email, password, role) values ('any admin', 'admin@email.com', '${password}', 'admin')`,
    );
    userMake = {
      email: 'admin@email.com',
      password: 'user1123',
    };
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('Será validado que o campo "email" é obrigatório', () => {
    delete userMake.email;
    request(app)
      .post('/login')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que o campo "password" é obrigatório', () => {
    delete userMake.password;
    request(app)
      .post('/login')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que não é possível acessar API com o campo "email" inválido', () => {
    userMake.email = 'any_email_email.com';
    request(app)
      .post('/login')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.email = 'any_email@email';
    request(app)
      .post('/login')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que não é possível acessar API com o campo "password" inválido', async () => {
    userMake.password = '_a_n_y_';
    request(app)
      .post('/login')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.password = 1;
    request(app)
      .post('/login')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.password = null;
    request(app)
      .post('/login')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.password = undefined;
    request(app)
      .post('/login')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que não é possível acessar API com "email" errado', async () => {
    userMake.email = 'any_email@email.com';
    const response = await request(app).post('/login').send(userMake);
    expect(response.status).toEqual(401);
  });

  it('Será validado que não é possível acessar API com "password" errado', async () => {
    userMake.password = 'any_password';
    const response = await request(app).post('/login').send(userMake);
    expect(response.status).toEqual(401);
  });

  it('Será validado que é possível acessar API com sucesso', async () => {
    const response = await request(app).post('/login').send(userMake);
    expect(response.status).toEqual(200);
    expect(response.body.user).toHaveProperty('id');
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.role).toEqual('admin');
  });
});
