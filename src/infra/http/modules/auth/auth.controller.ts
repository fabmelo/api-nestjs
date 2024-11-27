import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SignInUseCase } from '../../../../modules/auth/useCases/signInUseCase/signInUseCase';
import { Public } from './decorators/isPublic';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { AuthRequestModel } from './models/authRequestModel';
import { AuthenticatedRequestModel } from './models/authenticatedRequestModel';

@Controller()
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.signInUseCase.execute({
      user: request.user,
    });
    return { access_token };
  }

  @Get('teste')
  async teste(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
