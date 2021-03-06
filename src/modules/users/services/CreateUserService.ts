import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import HandleError from '@shared/errors/HandleError';

@injectable()
export default class CreateUserService {
  constructor(@inject('user') private usersRepository: IUsersRepository) {}
  public async execute({
    name,
    email,
    password,
    role,
  }: ICreateUser): Promise<IUser> {
    const userExists = await this.usersRepository.findByEmail(email);
    const hashedPassword = await hash(password, 8);
    if (userExists) {
      throw new HandleError('There is already one user with this email', 409);
    }

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await this.usersRepository.save(user);
    return user;
  }
}
