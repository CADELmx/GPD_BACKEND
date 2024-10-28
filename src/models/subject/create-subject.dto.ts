import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSubjectDto {
  @IsInt({ message: 'El programa educativo debe ser un número entero' })
  @Min(1, { message: 'El programa educativo debe ser un entero positivo' })
  @ApiProperty({ required: true, description: 'Id del programa educativo al que pertenece la materia', type: 'number', example: 1 })
  educationalProgramId: number;
  @IsInt({ message: 'Las horas semanales deben ser un número entero' })
  @Min(1, { message: 'Las horas semanales deben ser un entero positivo' })
  @ApiProperty({ required: true, description: 'Horas semanales de la materia', type: 'number', example: 4 })
  weeklyHours: number;
  @IsInt({ message: 'El total de horas debe ser un número entero' })
  @Min(1, { message: 'El total de horas debe ser un entero positivo' })
  @ApiProperty({ required: true, description: 'Total de horas de la materia', type: 'number', example: 64 })
  totalHours: number;
  @IsNotEmpty({ message: 'El periodo no puede estar vacío' })
  @IsString({ message: 'El periodo debe ser un texto' })
  @ApiProperty({ required: true, description: 'Periodo de la materia', type: 'string', example: 'Mayo - Agosto' })
  monthPeriod: string;
  @IsNotEmpty({ message: 'El nombre de la materia no puede estar vacío' })
  @IsString({ message: 'El nombre de la materia debe ser un texto' })
  @ApiProperty({ required: true, description: 'Nombre de la materia', type: 'string', example: 'Matemáticas para ING II' })
  subjectName: string;
}
