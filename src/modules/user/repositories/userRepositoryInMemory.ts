import { User } from '../entities/user';
import { UserRepository } from './userRepository';

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    await this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
