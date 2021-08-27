import { Connection } from 'typeorm';

import createConnections from '../src/shared/typeorm';

(async () => {
  console.log('Beginning dbseed task.');
  const connection: Connection = await createConnections();
  console.log('PG connected.');
  try {
    await connection.query('DELETE FROM user_tokens CASCADE');
    await connection.query('DELETE FROM users CASCADE');
  } catch (error) {
    console.log(error);
  }
  console.log('PG connection closed.');
  await connection.close();

  console.log('Finished dbseed task.');
})();
