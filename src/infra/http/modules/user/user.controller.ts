import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';

@Controller()
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('users')
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;
    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });
    return UserViewModel.toHttp(user);
  }
}
