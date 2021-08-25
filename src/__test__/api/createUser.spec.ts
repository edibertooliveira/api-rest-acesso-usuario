import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/api/app';

let connection: Connection;

describe('/register', () => {
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

  it('should be able to create a new user', async () => {
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
