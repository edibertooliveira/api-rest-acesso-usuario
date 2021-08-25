import { IUser } from '@modules/users/domain/models/IUser';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';

export interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findByEmail(id: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findAll(): Promise<IUser[]>;
  create(data: ICreateUser): IUser;
  save(user: IUser): Promise<IUser>;
  saveAll(users: IUser[]): Promise<IUser[]>;
}
