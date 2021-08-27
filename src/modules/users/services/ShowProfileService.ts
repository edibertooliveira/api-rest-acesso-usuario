import { inject, injectable } from 'tsyringe';
import { IShowProfile } from '@modules/users/domain/models/IShowProfile';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import HandleError from '@shared/errors/HandleError';

@injectable()
export default class ShowProfileService {
  constructor(@inject('user') private usersRepository: IUsersRepository) {}
  public async execute({ id }: IShowProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new HandleError('User not found');

    return user;
  }
}
