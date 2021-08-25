import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Movie from '../modules/movies/typeorm/entities/Movie';
import User from '../modules/users/typeorm/entities/User';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'typeormtest',
  password: 'password',
  database: 'typeormtest',
  synchronize: true,
  logging: false,
  entities: [Movie, User],
};

export { typeOrmConfig };
