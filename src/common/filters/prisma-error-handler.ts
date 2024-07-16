import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class PrismaErrorHandler {
  private readonly defaultMessages = {
    P2000: 'El valor proporcionado para la columna es demasiado largo',
    P2001: 'Registro no encontrado',
    P2002: 'Violación de unicidad (el registro ya existe)',
    P2003: 'Violación de la restricción de clave foránea',
    P2004: 'Violación de la restricción de chequeo',
    P2005: 'Valor no válido',
    P2006: 'Valor almacenado no válido',
    P2007: 'Error de validación de datos',
    P2008: 'Error en la consulta a la base de datos',
    P2009: 'No se pudo validar la consulta',
  };
  private readonly notHandleError = 'Error no manejado';
  private readonly errorText = 'Error en la operacion';

  public handleError(error: any | PrismaClientKnownRequestError): {
    error: string;
    message: string;
    data: null;
  } {
    if (error instanceof PrismaClientKnownRequestError) {
      const message: string =
        this.defaultMessages[error.code] || this.notHandleError;

      return {
        error: this.errorText,
        message,
        data: null,
      };
    }

    return {
      error: this.errorText,
      message: 'Error inesperado',
      data: null,
    };
  }
}
