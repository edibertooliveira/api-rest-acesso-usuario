import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';

export class HashProviderMake implements IHashProvider {
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }

  async generateHash(payload: string): Promise<string> {
    return payload;
  }
}
