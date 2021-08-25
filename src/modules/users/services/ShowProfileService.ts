import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/ApiError';

interface IShowProfileService {
  id: string;
}

export default class ShowProfileService {
  public async execute({ id }: IShowProfileService): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(id);
    if (!user) throw new AppError('User not found');

    return user;
  }
}
