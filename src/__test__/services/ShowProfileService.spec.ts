import 'reflect-metadata';
import { UsersRepositoryMake } from '../mocks/UsersRepositoryMake';
import { ShowProfileService } from '@modules/users/services';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import HandleError from '@shared/errors/HandleError';

describe('ShowProfileService', () => {
  let usersRepositoryMake: IUsersRepository;
  let showProfileService: ShowProfileService;
  let user: IUser;

  beforeEach(async () => {
    usersRepositoryMake = new UsersRepositoryMake();
    showProfileService = new ShowProfileService(usersRepositoryMake);
    user = await usersRepositoryMake.create({
      name: 'any name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'customer',
    });
  });

  it('Será retornado erro se o paramento "id" for invalido', async () => {
    const id = '999';
    await expect(async () => {
      await showProfileService.execute({ id });
    }).rejects.toBeInstanceOf(HandleError);
  });

  it('Será possível listar usuário com sucesso', async () => {
    const response = await showProfileService.execute({ id: user.id });
    expect(response.id).toEqual(user.id);
  });
});
