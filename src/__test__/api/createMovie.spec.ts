import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import createConnection from '@shared/typeorm';
import app from '@shared/api/app';
import User from '@modules/users/typeorm/entities/User';
import { hash } from 'bcryptjs';

let connection: Connection;

describe('/movies', () => {
  beforeAll(async () => {
    connection = await createConnection('test-app-ioasys');
    await connection.query('DROP TABLE IF EXISTS user_tokens CASCADE');
    await connection.query('DROP TABLE IF EXISTS users CASCADE');
    await connection.query('DROP TABLE IF EXISTS movies CASCADE');
    await connection.query('DROP TABLE IF EXISTS ratings CASCADE');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM migrations CASCADE');
    await connection.query('DELETE FROM user_tokens CASCADE');
    await connection.query('DELETE FROM users CASCADE');
    await connection.query('DELETE FROM movies CASCADE');
    await connection.query('DELETE FROM ratings CASCADE');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('ADMIN should be able to create a new Movie', async () => {
    const password = await hash('any_password', 8);
    await connection.getRepository(User).save({
      name: 'any admin',
      email: 'any_admin@admin.com',
      password: password,
      role: 'admin',
    });

    const responseLogin = await request(app).post('/login').send({
      email: 'any_admin@admin.com',
      password: 'any_password',
    });

    expect(responseLogin.status).toEqual(200);
    expect(responseLogin.body).toHaveProperty('token');

    const token = `Bearer ${responseLogin.body.token}`;

    const responseMovie = await request(app)
      .post('/movies')
      .set('Authorization', token)
      .send({
        title: '2001: A Space Odyssey',
        genre: 'science fiction',
        directors: 'Stanley Kubrick',
        authors: 'Stanley Kubrick, Arthur C Clarke',
        year: 2014,
      });
    expect(responseMovie.status).toEqual(201);
  });

  it('CUSTOMER not should be able to create a new Movie', async () => {
    const password = await hash('any_password', 8);
    await connection.getRepository(User).save({
      name: 'any user',
      email: 'any_user@user.com',
      password: password,
      role: 'customer',
    });

    const responseLogin = await request(app).post('/login').send({
      email: 'any_user@user.com',
      password: 'any_password',
    });

    expect(responseLogin.status).toEqual(200);
    expect(responseLogin.body).toHaveProperty('token');

    const token = `Bearer ${responseLogin.body.token}`;

    const responseMovie = await request(app)
      .post('/movies')
      .set('Authorization', token)
      .send({
        title: '2001: A Space Odyssey',
        genre: 'science fiction',
        directors: 'Stanley Kubrick',
        authors: 'Stanley Kubrick, Arthur C Clarke',
        year: 2014,
      });
    expect(responseMovie.status).toEqual(401);
  });
});
