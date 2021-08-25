import { Request, Response } from 'express';
import { UpdateUserAvatarService } from '../../../services';
import { container } from 'tsyringe';

export default class UsersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const userAvatar = container.resolve(UpdateUserAvatarService);
    const user = await userAvatar.execute({
      user_Id: req.user.id,
      avatarFilename: req.file?.filename,
    });

    return res.status(200).json(user);
  }
}
