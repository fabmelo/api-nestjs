import { IsEmailCustom } from '../../../../../infra/http/classValidator/decorators/IsEmailCustom';
import { IsNotEmptyCustom } from '../../../../../infra/http/classValidator/decorators/IsNotEmptyCustom';
import { IsStringCustom } from '../../../../../infra/http/classValidator/decorators/IsStringCustom';
import { MinLengthCustom } from '../../../../../infra/http/classValidator/decorators/MinLengthCustom';

export class SignInBody {
  @IsEmailCustom()
  @IsNotEmptyCustom()
  @IsStringCustom()
  email: string;

  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  @IsStringCustom()
  password: string;
}
