import { container } from 'tsyringe';

import { BcriptHashProvider } from '@modules/users/providers/HashProvider/implementations/BcriptHashProvider';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('hashProvider', BcriptHashProvider);
