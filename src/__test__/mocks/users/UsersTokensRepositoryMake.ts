import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import UserTokens from '@modules/users/infra/typeorm/entities/UserTokens';
import { v4 as uuidv4 } from 'uuid';

export class UsersTokensRepositoryMake implements IUsersTokensRepository {
  private tokens: UserTokens[] = [];

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    return this.tokens.find(check => check.token === token);
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const token = new UserTokens();
    token.id = uuidv4();
    token.user_id = user_id;
    token.token = '999';

    this.tokens.push(token);

    return token;
  }
}
