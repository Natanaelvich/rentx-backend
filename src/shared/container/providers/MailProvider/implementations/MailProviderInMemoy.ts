import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail({
    to,
    subject,
    variables,
    path,
  }: ISendMailDTO): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export { MailProviderInMemory };
