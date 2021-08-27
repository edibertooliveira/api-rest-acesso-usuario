import { v4 as uuidv4 } from 'uuid';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import User from '@modules/users/infra/typeorm/entities/User';

export class UsersRepositoryMake implements IUsersRepository {
  private users: User[] = [];

  public async findByName(name: string): Promise<User | undefined> {
    return this.users.find(user => user.name === name);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public create({ name, email, password }: ICreateUser): User {
    const user = new User();
    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    Object.assign(this.users, user);
    return user;
  }
}
