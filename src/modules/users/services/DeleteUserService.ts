import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/ApiError';

interface IDeleteUser {
  id: string;
}

export default class DeleteUserService {
  public async execute({ id }: IDeleteUser): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.exclude = true;
    await usersRepository.save(user);
  }
}
