import { ValidationError } from "class-validator";

export const mapperClassValidationErrorToAppException = (error: ValidationError[]) => {
    const errorList = {} as { [key: string]: string };
    error.forEach((e) => {
        errorList[e.property] = Object.values(e.constraints ?? {})[0];
    });
    return errorList;
}