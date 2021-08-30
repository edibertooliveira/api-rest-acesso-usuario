import 'reflect-metadata';
import { UsersRepositoryMake } from '../../../mocks/users/UsersRepositoryMake';
import { CreateUserService } from '@modules/users/services';
import HandleError from '@shared/errors/HandleError';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

describe('CreateUserService', () => {
  let usersRepositoryMake: IUsersRepository;
  let createUserService: CreateUserService;
  let newUserMake: ICreateUser;

  beforeEach(() => {
    newUserMake = {
      name: 'any name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'customer',
    };
    usersRepositoryMake = new UsersRepositoryMake();
    createUserService = new CreateUserService(usersRepositoryMake);
  });

  it('Será retornado erro se já existir o mesmo "email" cadastrado', async () => {
    await createUserService.execute(newUserMake);
    await expect(async () => {
      await createUserService.execute(newUserMake);
    }).rejects.toBeInstanceOf(HandleError);
  });

  it('Será possível cadastrar usuário com sucesso', async () => {
    const user = await createUserService.execute(newUserMake);
    expect(user).toHaveProperty('id');
  });
});
