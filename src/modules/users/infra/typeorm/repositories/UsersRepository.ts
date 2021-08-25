import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({
      where: {
        email,
      },
    });
  }

  public async findAll(): Promise<User[]> {
    return await this.ormRepository.find();
  }

  public create({ name, email, password, role }: ICreateUser): User {
    return this.ormRepository.create({
      name,
      email,
      password,
      role,
    });
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  public async saveAll(users: User[]): Promise<User[]> {
    return await this.ormRepository.save(users);
  }
}
