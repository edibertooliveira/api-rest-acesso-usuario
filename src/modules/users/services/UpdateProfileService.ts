import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/ApiError';

interface IUpdateProfileService {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfileService): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (!user.email.includes(email) && userUpdateEmail)
      throw new AppError('There is already one user with this email.');

    if (password && !old_password)
      throw new AppError('Old password is required.');

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (checkOldPassword) throw new AppError('Old password not match.');
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
