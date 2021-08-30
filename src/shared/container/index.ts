import { container } from 'tsyringe';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import '@modules/users/providers/HashProvider';

container.registerSingleton<IUsersRepository>('user', UsersRepository);
container.registerSingleton<IUsersTokensRepository>(
  'user_token',
  UsersTokensRepository,
);
