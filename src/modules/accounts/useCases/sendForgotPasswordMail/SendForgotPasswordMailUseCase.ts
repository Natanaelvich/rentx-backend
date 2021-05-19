import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private UsersTokensRepository: IUsersTokensRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User not found');
    }

    const expires_date = this.dateProvider.addHours(3, null);
    const token = uuidV4();
    await this.UsersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    this.mailProvider.sendMail({
      to: { name: user.name, email: user.email },
      subject: 'Recuperação de senha',
      templateData: `O link para o reset de sua senha é ${token}`,
    });
  }
}

export { SendForgotPasswordMailUseCase };
