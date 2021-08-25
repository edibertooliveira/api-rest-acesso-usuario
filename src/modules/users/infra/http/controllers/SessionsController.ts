import { Request, Response } from 'express';
import { CreateSessionService } from '../../../services';
import { container } from 'tsyringe';

export default class SessionsController {
  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const loginUser = container.resolve(CreateSessionService);
    const users = await loginUser.execute({ email, password });
    return res.status(200).json(users);
  }
}
