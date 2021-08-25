import { inject, injectable } from 'tsyringe';
import path from 'path';
import EtherealMail from '@config/mail/EtherealMail';
import { ISendForgot } from '@modules/users/domain/models/ISendForgot';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUsersTokensRepository';
import HandleError from '@shared/errors/handleError';

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('user') private usersRepository: IUsersRepository,
    @inject('user_token')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}
  public async execute({ email }: ISendForgot): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new HandleError('User does not exists.');

    const { token } = await this.usersTokensRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: { name: `${user.name}`, email: user.email },
      subject: '[x-friends] Recuperação de senha',
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
