import {
  BadRequestException,
  Injectable,
  ParseBoolPipe,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError, ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}
@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  protected flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    const messages = validationErrors.map((error) => {
      return Object.values(error.constraints).join(', ');
    });
    return messages;
  }
  createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      const messages = this.flattenValidationErrors(validationErrors);
      return new BadRequestException(messages.join(', '));
    };
  }
}

export class validateForeignKeys {
  private validations = [];
  constructor() {}
  add(validation) {
    this.validations.push(validation);
  }
  async validate() {
    const res = await Promise.all(this.validations);
    return res.some((count) => count === 0);
  }
}

export const customIdPipe = new ParseIntPipe({
  optional: true,
  exceptionFactory: () => new BadRequestException('El ID debe ser un número'),
});
export const customBoolPipe = new ParseBoolPipe({
  optional: true,
  exceptionFactory: () => new BadRequestException('El valor debe ser un booleano'),
});
