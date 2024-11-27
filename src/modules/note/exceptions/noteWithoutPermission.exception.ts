import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../../exceptions/app.exceptions';

interface NoteWithoutPermissionExceptionProps {
  actionName: string;
}

export class NoteWithoutPermissionException extends AppException {
  constructor({ actionName }: NoteWithoutPermissionExceptionProps) {
    super({
      message: `Você não tem permissão para ${actionName} essa anotação`,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
