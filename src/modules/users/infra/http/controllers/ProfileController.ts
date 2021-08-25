import { Request, Response } from 'express';
import { ShowProfileService, UpdateProfileService } from '../../../services';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const findUser = container.resolve(ShowProfileService);
    const user = await findUser.execute({ id });
    return res.status(200).json(classToClass(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;
    const updateUser = container.resolve(UpdateProfileService);
    const user = await updateUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });
    return res.status(200).json(classToClass(user));
  }
}
