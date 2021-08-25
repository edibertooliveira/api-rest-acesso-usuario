import nodemailer from 'nodemailer';
import { HandlebarsMailTemplete } from '@config/mail/HandlebarsMailTemplete';
interface IMailContact {
  name: string;
  email: string;
}

interface ITempleteVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITempleteVariable;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const handlebarsMailTemplete = new HandlebarsMailTemplete();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Api Vendas',
        address: from?.email || 'content@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: subject || '[API Vendas] Recuperação de senha',
      html: await handlebarsMailTemplete.parse(templateData),
    });
    // eslint-disable-next-line no-console
    console.log('Message send: %s', message.messageId);
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
