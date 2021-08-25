import { EntityRepository, Repository } from 'typeorm';
import UserTokens from '@modules/users/typeorm/entities/UserTokens';

@EntityRepository(UserTokens)
export class UsersTokensRepository extends Repository<UserTokens> {
  public async findByToken(token: string): Promise<UserTokens | undefined> {
    return await this.findOne({
      where: {
        token,
      },
    });
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}
