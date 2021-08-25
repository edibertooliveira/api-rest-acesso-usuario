import 'reflect-metadata';
import { users, password } from '../../../__test__/mocks/responseMock';
import User from '../../../modules/users/infra/typeorm/entities/User';
import createConnection from '../index';
(async () => {
  console.log('Beginning dbseed task.');

  createConnection()
    .then(async conn => {
      console.log('PG connected.');
      await conn.createQueryBuilder().insert().into(User).values(users);
      await conn.createQueryBuilder().insert().into(User).values({
        name: 'user admin',
        email: 'admin@admin.com',
        password,
        role: 'admin',
      });
      console.log('PG connection closed.');
      await conn.close();
    })
    .catch(error => console.log(error));

  console.log('Finished dbseed task.');
})();
