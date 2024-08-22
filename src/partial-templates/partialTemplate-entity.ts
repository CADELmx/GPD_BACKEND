import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { PartialTemplate } from '@prisma/client';
import { CreatePartialTemplateDto } from '../models/partialTemplate/create-partial-template.dto';

export class PartialTemplateEntity implements PartialTemplate {
  @ApiProperty()
  id: number;

  @Min(1, { message: 'El campo número de trabajador debe ser mayor a 1' })
  @IsInt({ message: 'El campo número de trabajador debe ser un número entero'})
  @IsNotEmpty({message: 'El campo número de trabajador no puede estar vacío'})
  @ApiProperty({required: true, description: 'Número de trabajador'})
  nt: number;

  @IsString({ message: 'El campo nombre tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo nombre no puede estar vacío'})
  @ApiProperty({required: true, description: 'Nombre del trabajador'})
  name: string;

  @IsString({ message: 'El campo genero tiene que ser una cadena de texto'})
  @IsOptional()
  @ApiProperty({description: 'Especificar el genero'})
  gender: string;

  @IsString({ message: 'El campo posición tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo posición no puede estar vacío'})
  @ApiProperty({required: true, description: 'Pocisión del trabajador'})
  position: string;

  @IsInt({ message: 'El campo total debe ser un número entero'})
  @IsNotEmpty({message: 'El campo total no puede estar vacío'})
  @ApiProperty({required: true, description: 'Total de horas del trabajador'})
  total: number;

  @IsString({ message: 'El campo estado tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo estado no puede estar vacío'})
  @ApiProperty({required: true, description: 'Estatus del trabajador'})
  status: string;

  @IsString({ message: 'El campo año tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo año no puede estar vacío'}) 
  @ApiProperty({required: true, description: 'Introduce el año correspondiente'})
  year: string;

  @IsString({ message: 'El campo periodo tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo periodo no puede estar vacío'})
  @ApiProperty({required: true, description: 'Introduccir el periodo de trabajo'})
  period: string;

  @IsInt({ message: 'El campo ID Plantilla debe ser un número entero'})
  @IsNotEmpty({message: 'El campo ID Plantilla no puede estar vacío'})
  @ApiProperty({required: true, description: 'Ingresa la plantilla a la que pertenece'})
  templateId: bigint;
}
