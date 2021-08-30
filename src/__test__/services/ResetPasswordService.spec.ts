import 'reflect-metadata';
import { ResetPasswordService } from '@modules/users/services';
import HandleError from '@shared/errors/HandleError';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import { UsersTokensRepositoryMake } from '../mocks/UsersTokensRepositoryMake';
// import { IUserTokens } from '@modules/users/domain/models/IUserTokens';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { UsersRepositoryMake } from '../mocks/UsersRepositoryMake';
import { IUser } from '@modules/users/domain/models/IUser';

describe('ResetPasswordService', () => {
  let usersTokensRepositoryMake: IUsersTokensRepository;
  let usersRepositoryMake: IUsersRepository;
  let resetPasswordService: ResetPasswordService;
  let user: IUser;
  // let tokenCurrent: IUserTokens;

  beforeEach(async () => {
    usersRepositoryMake = new UsersRepositoryMake();
    usersTokensRepositoryMake = new UsersTokensRepositoryMake();
    resetPasswordService = new ResetPasswordService(
      usersRepositoryMake,
      usersTokensRepositoryMake,
    );
    user = await usersRepositoryMake.create({
      name: 'any name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'customer',
    });

    // tokenCurrent = await usersTokensRepositoryMake.generate(user.id);
  });

  it('Será retornado erro se o paramento "id" for invalido', async () => {
    await expect(async () => {
      await resetPasswordService.execute({
        token: '999',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(HandleError);
  });
});
