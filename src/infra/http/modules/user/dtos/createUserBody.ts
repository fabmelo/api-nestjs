import { IsEmailCustom } from "../../../../../infra/http/classValidator/decorators/IsEmailCustom";
import { IsNotEmptyCustom } from "../../../../../infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "../../../../../infra/http/classValidator/decorators/IsStringCustom";
import { MinLengthCustom } from "../../../../../infra/http/classValidator/decorators/MinLengthCustom";

export class CreateUserBody {
    @IsNotEmptyCustom()
    @IsStringCustom()
    name: string;

    @IsEmailCustom()
    @IsStringCustom()
    @IsNotEmptyCustom()
    email: string;

    @IsNotEmptyCustom()
    @IsStringCustom()
    @MinLengthCustom(6)
    password: string;
}