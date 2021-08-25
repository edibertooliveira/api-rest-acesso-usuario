import AppError from '../../../shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findByEmail(email);
    const hashedPassword = await hash(password, 8);
    if (userExists) {
      throw new AppError('There is already one user with this email', 409);
    }

    const user = usersRepository.create({
      name,
      email,
      role: 'customer',
      password: hashedPassword,
    });

    await usersRepository.save(user);
    return user;
  }
}
