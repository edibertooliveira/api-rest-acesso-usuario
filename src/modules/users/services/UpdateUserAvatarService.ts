import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { IUpdateUserAvatar } from '@modules/users/domain/models/IUpdateUserAvatar';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';
import HandleError from '@shared/errors/HandleError';

@injectable()
export default class UpdateUserAvatarService {
  constructor(@inject('user') private usersRepository: IUsersRepository) {}
  public async execute({
    user_Id,
    avatarFilename,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(user_Id);
    if (!user) {
      throw new HandleError('user not found', 404);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename || '';
    await this.usersRepository.save(user);
    return user;
  }
}
