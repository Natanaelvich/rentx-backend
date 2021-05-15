import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UsersTokens } from '../entities/UserTokens';

interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UsersTokens>;
}

export { IUsersTokensRepository };
