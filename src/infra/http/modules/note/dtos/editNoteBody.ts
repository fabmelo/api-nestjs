import { IsOptional } from "class-validator";
import { IsNotEmptyCustom } from "../../../../../infra/http/classValidator/decorators/IsNotEmptyCustom";
import { IsStringCustom } from "../../../../../infra/http/classValidator/decorators/IsStringCustom";

export class EditNoteBody{
    @IsNotEmptyCustom()
    @IsStringCustom()
    title: string;

    @IsStringCustom()
    @IsOptional()
    description: string;
}