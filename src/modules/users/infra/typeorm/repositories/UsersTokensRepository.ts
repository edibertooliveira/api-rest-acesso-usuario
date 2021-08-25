import { getRepository, Repository } from 'typeorm';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import UserTokens from '@modules/users/infra/typeorm/entities/UserTokens';

export class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    return await this.ormRepository.findOne({
      where: {
        token,
      },
    });
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = await this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
