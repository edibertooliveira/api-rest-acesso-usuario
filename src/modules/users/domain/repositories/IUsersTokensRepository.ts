import { IUserTokens } from '@modules/users/domain/models/IUserTokens';

export interface IUsersTokensRepository {
  findByToken(token: string): Promise<IUserTokens | undefined>;
  generate(user_id: string): Promise<IUserTokens>;
}
