import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';

@injectable()
export default class ListUsersService {
  constructor(@inject('user') private usersRepository: IUsersRepository) {}
  public async execute(): Promise<IUser[]> {
    return await this.usersRepository.findAll();
  }
}
