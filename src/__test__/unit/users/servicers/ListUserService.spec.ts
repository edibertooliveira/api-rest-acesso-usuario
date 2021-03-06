import 'reflect-metadata';
import { UsersRepositoryMake } from '../../../mocks/users/UsersRepositoryMake';
import { ListUsersService } from '@modules/users/services';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

describe('ListUsersService', () => {
  let usersRepositoryMake: IUsersRepository;
  let listUserService: ListUsersService;

  beforeEach(() => {
    usersRepositoryMake = new UsersRepositoryMake();
    listUserService = new ListUsersService(usersRepositoryMake);
  });

  it('Será possível listar usuário com sucesso', async () => {
    const user = await listUserService.execute();
    expect(user).toEqual([]);
  });
});
