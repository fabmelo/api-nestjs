import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user';
import { UserWithSameEmailException } from '../../exceptions/userWithSameEmail.exception';
import { UserRepository } from '../../repositories/userRepository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute({ name, email, password }: CreateUserRequest) {

    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new UserWithSameEmailException();
    }
    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    await this.userRepository.create(user);
    return user;
  }
}
