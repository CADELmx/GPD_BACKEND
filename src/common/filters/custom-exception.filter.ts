import {
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const errorMessages = {
        [HttpStatus.BAD_REQUEST]: 'Solicitud incorrecta',
        [HttpStatus.UNAUTHORIZED]: 'No autorizado',
        [HttpStatus.FORBIDDEN]: 'Prohibido',
        [HttpStatus.NOT_FOUND]: 'Ruta no encontrada',
        [HttpStatus.INTERNAL_SERVER_ERROR]: 'Error interno del servidor',
        [HttpStatus.REQUEST_TIMEOUT]: 'Tiempo de espera agotado',
        [HttpStatus.BAD_GATEWAY]: 'Ruta de acceso incorrecta',
      };
      const errorMessage: string = errorMessages[status] || 'Error desconocido';
      let message: string = '';
      if (
        exception instanceof BadRequestException &&
        Array.isArray(exceptionResponse['message'])
      ) {
        message = exceptionResponse['message']
          .map((msg: string | ValidationError) => {
            if (typeof msg === 'string') {
              return msg;
            }
            return Object.values(msg.constraints).join(', ');
          })
          .join(', ');
      } else if (typeof exceptionResponse === 'object') {
        message = exceptionResponse['message'] || message;
      }

      response.status(status).json({
        message: message,
        error: errorMessage,
      });
    } else {
      // Maneja casos donde `exception` no es una `HttpException`
      console.error('Unhandled exception:', exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error interno del servidor',
        error: 'Error desconocido',
      });
    }
  }
}
