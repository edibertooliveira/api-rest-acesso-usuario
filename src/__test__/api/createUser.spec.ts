import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/api/app';

describe('endpoint para o cadastro de usuários "/register"', () => {
  let connection: Connection;
  let userMake: any;

  beforeAll(async () => {
    connection = await createConnection('test-app-ioasys');
    await connection.query('DROP TABLE IF EXISTS user_tokens CASCADE');
    await connection.query('DROP TABLE IF EXISTS users CASCADE');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM migrations CASCADE');
    await connection.query('DELETE FROM user_tokens CASCADE');
    await connection.query('DELETE FROM users CASCADE');
    userMake = {
      name: 'any user',
      email: 'any_email@email.com',
      password: 'any_password',
    };
  });

  afterAll(async () => {
    const mainConnection = getConnection();
    await connection.close();
    await mainConnection.close();
  });

  it('Será validado que o campo "name" é obrigatório', () => {
    delete userMake.name;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que o campo "email" é obrigatório', () => {
    delete userMake.email;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que o campo "password" é obrigatório', () => {
    delete userMake.password;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que não é possível cadastrar usuário com o campo "name" inválido', () => {
    userMake.name = 'a';
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.name = 1;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.name = undefined;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.name = null;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que não é possível cadastrar usuário com o campo "email" inválido', () => {
    userMake.email = 'any_email_email.com';
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.email = 'any_email@email';
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que não é possível cadastrar usuário com o campo "password" inválido', async () => {
    userMake.password = '_a_n_y_';
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.password = 1;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.password = null;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));

    userMake.password = undefined;
    request(app)
      .post('/register')
      .send(userMake)
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que o campo "email" é único', async () => {
    await request(app).post('/register').send(userMake);
    const response = await request(app).post('/register').send(userMake);
    expect(response.status).toEqual(409);
  });

  it('Será validado que é possível cadastrar usuário com sucesso', async () => {
    const response = await request(app).post('/register').send(userMake);
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.role).toEqual('customer');
  });
});
