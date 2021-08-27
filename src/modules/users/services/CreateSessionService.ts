import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import HandleError from '@shared/errors/HandleError';
import authConfig from '../../../config/auth';
import { ICreateSession } from '@modules/users/domain/models/ICreateSession';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';

interface IResponse {
  user: IUser;
  token: string;
}
@injectable()
export default class CreateSessionService {
  constructor(@inject('user') private usersRepository: IUsersRepository) {}
  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !(await compare(password, user.password))) {
      throw new HandleError('Incorrect email/password combination', 401);
    }

    const token = jwt.sign(
      {
        role: user.role,
      },
      authConfig.jwt.secret,
      {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn,
      },
    );

    return { user, token };
  }
}
