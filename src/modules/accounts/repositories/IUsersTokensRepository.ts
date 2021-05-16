import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UsersTokens } from '../entities/UserTokens';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UsersTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersTokens | undefined>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
