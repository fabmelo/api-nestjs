import {
    isEmail,
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from 'class-validator';
import { ExceptionsMessages } from '../data/ExceptionsMessages';

export function IsEmailCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsEmailCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
            return isEmail(value);
        },
        defaultMessage(validationArguments: ValidationArguments) {
            return ExceptionsMessages.isEmail(validationArguments.property);
        }
      },
    });
  };
}
