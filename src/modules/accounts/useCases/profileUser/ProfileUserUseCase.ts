import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';
import { UserMap } from '@modules/accounts/mappers/UserMap';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: UsersRepository,
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found!');
    }

    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
