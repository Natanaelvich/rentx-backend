import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
      avatar,
    });
    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }
}

export { UsersRepositoryInMemory };
