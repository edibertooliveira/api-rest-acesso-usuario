import 'reflect-metadata';
import { UsersRepositoryMake } from '../../../mocks/users/UsersRepositoryMake';
import { UpdateProfileService } from '@modules/users/services';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import HandleError from '@shared/errors/HandleError';

describe('UpdateProfileService', () => {
  let usersRepositoryMake: IUsersRepository;
  let updateProfileService: UpdateProfileService;
  let user: IUser;

  beforeEach(async () => {
    usersRepositoryMake = new UsersRepositoryMake();
    updateProfileService = new UpdateProfileService(usersRepositoryMake);
    user = await usersRepositoryMake.create({
      name: 'any name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'customer',
    });
  });

  it('Será retornado erro se o paramento "id" for invalido', async () => {
    await expect(async () => {
      const { id, email, password, name } = user;
      await updateProfileService.execute({
        user_id: id,
        name,
        email,
        password,
        old_password: password,
      });
    }).rejects.toBeInstanceOf(HandleError);
  });
});
