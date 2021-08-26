import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/api/app';

describe('endpoint para o cadastro de usuários "/register"', () => {
  let connection: Connection;

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
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('Será validado que o campo "name" é obrigatório', async () => {
    const response = await request(app).post('/register').send({
      email: 'any_email@user.com',
      password: 'any_password',
    });
    expect(response.status).toEqual(400);
  });

  it('Será validado que o campo "email" é obrigatório', async () => {
    const response = await request(app).post('/register').send({
      name: 'any user',
      password: 'any_password',
    });
    expect(response.status).toEqual(400);
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    const response = await request(app).post('/register').send({
      name: 'any user',
      email: 'any_email@user.com',
    });
    expect(response.status).toEqual(400);
  });

  it('Será validado que não é possível cadastrar usuário com o campo "name" inválido', async () => {
    request(app)
      .post('/register')
      .send({
        name: 'a',
        email: 'any_email@user.com',
        password: 'any_password',
      })
      .then(response => expect(response.status).toEqual(400));

    request(app)
      .post('/register')
      .send({
        name: 1,
        email: 'any_email@user.com',
        password: 'any_password',
      })
      .then(response => expect(response.status).toEqual(400));

    request(app)
      .post('/register')
      .send({
        name: undefined,
        email: 'any_email@user.com',
        password: 'any_password',
      })
      .then(response => expect(response.status).toEqual(400));

    request(app)
      .post('/register')
      .send({
        name: null,
        email: 'any_email@user.com',
        password: 'any_password',
      })
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que não é possível cadastrar usuário com o campo "email" inválido', async () => {
    request(app)
      .post('/register')
      .send({
        name: 'any user',
        email: 'any_email_user.com',
        password: 'any_password',
      })
      .then(response => expect(response.status).toEqual(400));

    request(app)
      .post('/register')
      .send({
        name: 'any user',
        email: 'any_email@user',
        password: 'any_password',
      })
      .then(response => expect(response.status).toEqual(400));
  });

  it('Será validado que não é possível cadastrar usuário com o campo "password" inválido', async () => {
    const response = await request(app).post('/register').send({
      name: 'any user',
      email: 'any_email@user.com',
      password: 'any',
    });
    expect(response.status).toEqual(400);
  });

  it('Será validado que o campo "email" é único', async () => {
    await request(app).post('/register').send({
      name: 'any user',
      email: 'any_email@user.com',
      password: 'any_password',
    });
    const response = await request(app).post('/register').send({
      name: 'any user',
      email: 'any_email@user.com',
      password: 'any_password',
    });
    expect(response.status).toEqual(409);
  });

  it('Será validado que é possível cadastrar usuário com sucesso', async () => {
    const response = await request(app).post('/register').send({
      name: 'any user',
      email: 'any_email@user.com',
      password: 'any_password',
    });
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.role).toEqual('customer');
  });
});
