import 'reflect-metadata';
import { UsersRepositoryMake } from '../../../mocks/users/UsersRepositoryMake';
import { UpdateUserAvatarService } from '@modules/users/services';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
// import { IUser } from '@modules/users/domain/models/IUser';
import HandleError from '@shared/errors/HandleError';

describe('UpdateUserAvatarService', () => {
  let usersRepositoryMake: IUsersRepository;
  let updateUserAvatarService: UpdateUserAvatarService;
  // let user: IUser;

  beforeEach(async () => {
    usersRepositoryMake = new UsersRepositoryMake();
    updateUserAvatarService = new UpdateUserAvatarService(usersRepositoryMake);
    // user = await usersRepositoryMake.create({
    //   name: 'any name',
    //   email: 'any_email@email.com',
    //   password: 'any_password',
    //   role: 'customer',
    // });
  });

  it('Será retornado erro se o paramento "id" for invalido', async () => {
    await expect(async () => {
      await updateUserAvatarService.execute({
        user_id: '999',
        avatarFilename: '',
      });
    }).rejects.toBeInstanceOf(HandleError);
  });
});
