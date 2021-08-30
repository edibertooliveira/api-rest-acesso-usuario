import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUpdateUser } from '@modules/users/domain/models/IUpdateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import HandleError from '@shared/errors/HandleError';

@injectable()
export default class UpdateProfileService {
  constructor(@inject('user') private usersRepository: IUsersRepository) {}
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateUser): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (user_id !== user.id) throw new HandleError('User not authorized', 403);

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (!user.email.includes(email) && userUpdateEmail)
      throw new HandleError('There is already one user with this email.');

    if (password && !old_password)
      throw new HandleError('Old password is required.');

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) throw new HandleError('Old password not match.');
      user.password = await hash(password, 8);
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}
