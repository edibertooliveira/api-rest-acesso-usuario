import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';

export class BcriptHashProvider implements IHashProvider {
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
