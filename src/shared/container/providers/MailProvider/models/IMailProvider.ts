import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
  sendMail({ to, subject, variables, path }: ISendMailDTO): Promise<void>;
}
