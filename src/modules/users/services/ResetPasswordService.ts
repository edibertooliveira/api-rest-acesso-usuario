import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { IResetPassword } from '@modules/users/domain/models/IResetPassword';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import HandleError from '@shared/errors/handleError';

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('user') private usersRepository: IUsersRepository,
    @inject('user_token')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}
  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.usersTokensRepository.findByToken(token);
    if (!userToken) throw new HandleError('User Token does not exists.');
    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new HandleError('User does not exists.');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate))
      throw new HandleError('Token expired.');

    user.password = await hash(password, 8);
    await this.usersRepository.save(user);
  }
}
