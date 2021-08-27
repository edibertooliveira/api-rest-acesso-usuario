import { Connection } from 'typeorm';

import createConnections from '../src/shared/typeorm';
import { password } from '../src/__test__/mocks/usersMake';

(async () => {
  console.log('Beginning dbseed task.');
  const connection: Connection = await createConnections();
  console.log('PG connected.');
  try {
    await connection.query(
      `INSERT INTO users (name, email, password, role) values ('any admin', 'admin@email.com', '${password}', 'admin'),
                                                                    ('any user', 'user@email.com', '${password}', 'customer')`,
    );
  } catch (error) {
    console.log(error);
  }
  console.log('PG connection closed.');
  await connection.close();

  console.log('Finished dbseed task.');
})();
