import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from '../../../user/repositories/userRepository';
import { AuthValuesIncorrectException } from '../../exceptions/authValueIncorrect.exception';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AuthValuesIncorrectException();

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched)
      throw new AuthValuesIncorrectException();

    return user;
  }
}