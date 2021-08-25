import AppError from '../../../shared/errors/ApiError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/users/typeorm/repositories/UsersTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';
interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = getCustomRepository(UsersTokensRepository);
    const user = await usersRepository.findByEmail(email);
    if (!user || user.exclude) throw new AppError('User does not exists.', 404);

    const { token } = await usersTokensRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: { name: user.name, email: user.email },
      subject: '[API Ioasys] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
