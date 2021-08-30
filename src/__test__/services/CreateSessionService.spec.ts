import 'reflect-metadata';
import { HashProviderMake } from '../mocks/HashProviderMake';
import { UsersRepositoryMake } from '../mocks/UsersRepositoryMake';
import { CreateSessionService } from '@modules/users/services';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateSession } from '@modules/users/domain/models/ICreateSession';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import HandleError from '@shared/errors/HandleError';

describe('CreateSessionService', () => {
  let usersRepositoryMake: IUsersRepository;
  let hashProviderMake: IHashProvider;
  let createSessionService: CreateSessionService;
  let userMake: ICreateSession;

  beforeEach(async () => {
    userMake = {
      email: 'any_email@email.com',
      password: 'any_password',
    };
    usersRepositoryMake = new UsersRepositoryMake();
    hashProviderMake = new HashProviderMake();
    createSessionService = new CreateSessionService(
      usersRepositoryMake,
      hashProviderMake,
    );
    await usersRepositoryMake.create({
      name: 'any name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'customer',
    } as ICreateUser);
  });

  it('Será validado que não é possível acessar API com o campo "email" inválido', () => {
    userMake.email = 'email@email';
    expect(async () => {
      await createSessionService.execute(userMake);
    }).rejects.toBeInstanceOf(HandleError);
  });

  it('Será validado que não é possível acessar API com o campo "password" inválido', () => {
    userMake.password = '_a_n_y_p_a_s_s_';
    expect(async () => {
      await createSessionService.execute(userMake);
    }).rejects.toBeInstanceOf(HandleError);
  });

  it('Será possível acessar a API com sucesso', async () => {
    const user = await createSessionService.execute(userMake);
    expect(user).toHaveProperty('token');
  });
});
