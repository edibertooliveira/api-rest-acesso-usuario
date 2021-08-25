import { Request, Response } from 'express';
import {
  ShowProfileService,
  UpdateProfileService,
  DeleteUserService,
} from '../services/';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const findUser = new ShowProfileService();
    const user = await findUser.execute({ id });
    return res.status(200).json(classToClass(user));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const deleteUser = new DeleteUserService();
    await deleteUser.execute({ id });
    return res.status(204).json();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;
    const updateUser = new UpdateProfileService();
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
