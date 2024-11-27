import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exceptions';

export class InvalidAccessToken extends AppException {
  constructor() {
    super({
      message: 'Access token inválido ou expirado',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
