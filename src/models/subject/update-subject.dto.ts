import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
  @IsOptional()
  @IsInt({ message: 'El programa educativo debe ser un número entero' })
  @Min(1, { message: 'El programa educativo debe ser un entero positivo' })
  @ApiProperty({ required: false, description: 'Id del programa educativo al que pertenece la materia', type: 'number', example: 1 })
  educationalProgramId: number;
  @IsOptional()
  @IsInt({ message: 'Las horas semanales deben ser un número entero' })
  @Min(1, { message: 'Las horas semanales deben ser un entero positivo' })
  @ApiProperty({ required: false, description: 'Horas semanales de la materia', type: 'number', example: 4 })
  weeklyHours: number;
  @IsOptional()
  @IsInt({ message: 'El total de horas debe ser un número entero' })
  @Min(1, { message: 'El total de horas debe ser un entero positivo' })
  @ApiProperty({ required: false, description: 'Total de horas de la materia', type: 'number', example: 64 })
  totalHours: number;
  @IsOptional()
  @IsNotEmpty({ message: 'El periodo no puede estar vacío' })
  @IsString({ message: 'El periodo debe ser un texto' })
  @ApiProperty({ required: false, description: 'Periodo de la materia', type: 'string', example: 'Mayo - Agosto' })
  monthPeriod: string;
  @IsOptional()
  @IsNotEmpty({ message: 'El nombre de la materia no puede estar vacío' })
  @IsString({ message: 'El nombre de la materia debe ser un texto' })
  @ApiProperty({ required: false, description: 'Nombre de la materia', type: 'string', example: 'Matemáticas para ING II' })
  subjectName: string;
}
