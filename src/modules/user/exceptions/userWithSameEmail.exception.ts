import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/app.exceptions';

export class UserWithSameEmailException extends AppException {
  constructor() {
    super({
      message: 'Usuário com mesmo email já cadastrado',
      status: HttpStatus.CONFLICT,
    });
  }
}
