import { Request, Response } from 'express';
import { CreateUserService, ListUsersService } from '../../../services';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(_req: Request, res: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);
    const users = await listUsers.execute();
    return res.status(200).json(classToClass(users));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      email,
      password,
      role: 'customer',
    });
    return res.status(201).json(classToClass(user));
  }
}
