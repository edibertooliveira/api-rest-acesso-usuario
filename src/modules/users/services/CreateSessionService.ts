import AppError from '../../../shared/errors/ApiError';
import authConfig from '../../../config/auth';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import jwt from 'jsonwebtoken';

interface ICreateSession {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user || user.exclude || !(await compare(password, user.password))) {
      throw new AppError('Incorrect email/password combination', 401);
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
