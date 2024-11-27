import {
    minLength,
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from 'class-validator';
import { ExceptionsMessages } from '../data/ExceptionsMessages';

export function MinLengthCustom(min: number, validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'MinLengthCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min],
      options: validationOptions,
      validator: {        
        validate(value: unknown) {
            return minLength(value, min);
        },
        defaultMessage(validationArguments: ValidationArguments) {
            return ExceptionsMessages.minLength(validationArguments.property, min);
        }
      },
    });
  };
}
