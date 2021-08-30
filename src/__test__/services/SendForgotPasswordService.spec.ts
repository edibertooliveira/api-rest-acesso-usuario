import 'reflect-metadata';
import { UsersRepositoryMake } from '../mocks/UsersRepositoryMake';
import { SendForgotPasswordEmailService } from '@modules/users/services';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import HandleError from '@shared/errors/HandleError';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';

describe('SendForgotPasswordService', () => {
  let usersRepositoryMake: IUsersRepository;
  let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

  beforeEach(async () => {
    usersRepositoryMake = new UsersRepositoryMake();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      usersRepositoryMake,
      {} as IUsersTokensRepository,
    );
    await usersRepositoryMake.create({
      name: 'any name',
      email: 'any_email@email.com',
      password: 'any_password',
      role: 'customer',
    });
  });

  it('Será retornado erro se o paramento "id" for invalido', async () => {
    await expect(async () => {
      await sendForgotPasswordEmailService.execute({
        email: 'any_email@mail.com',
      });
    }).rejects.toBeInstanceOf(HandleError);
  });
});
