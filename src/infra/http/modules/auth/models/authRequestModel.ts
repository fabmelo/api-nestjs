import { Request } from 'express';
import { User } from '../../../../../modules/user/entities/user';

export class AuthRequestModel extends Request {
  user: User;
}
