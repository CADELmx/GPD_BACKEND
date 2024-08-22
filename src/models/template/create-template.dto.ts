import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
export class CreateTemplateDto {
  @ApiProperty({
    description: 'Estado de aprobación de la plantilla',
    example: 'pendiente, aprovado o corección',
    required: true,
  })
  @IsString({ message: 'El campo estado tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo estado no puede estar vacío' })
  state: string = 'pendiente';

  @ApiProperty({
    description: 'ID del área a la que pertenece la plantilla ',
    example: 1,
    required: true,
  })
  @IsInt({ message: "El campo 'área' tiene que ser un número entero" })
  @IsNotEmpty({ message: "El campo 'área' no puede estar vacío" })
  @Min(1, {
    message: "El campo 'área' tiene que ser un número entero positivo",
  })
  areaId: number;

  @ApiProperty({
    description: 'Periodo a la que pertenece la plantilla',
    example: 'enero - abril 2023: Ordinario',
    required: true,
  })
  @IsString({ message: 'El campo periodo tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo periodo no puede estar vacío' })
  period: string;

  @ApiProperty({
    description: 'ID del usuario responsable de la plantilla',
    example: 1,
    required: true,
  })
  @IsInt({ message: "El campo 'responsable' tiene que ser un número entero" })
  @IsNotEmpty({ message: "El campo 'responsable' no puede estar vacío" })
  @Min(1, {
    message: "El campo 'responsable' tiene que ser un número entero positivo",
  })
  responsibleId: number;

  @ApiProperty({
    description: 'ID del usuario que revisó la plantilla',
    example: 1,
    required: true,
  })
  @IsInt({ message: "El campo 'revisado por' tiene que ser un número entero" })
  @IsNotEmpty({ message: "El campo 'revisado por' no puede estar vacío" })
  @Min(1, {
    message: "El campo 'revisado por' tiene que ser un número entero",
  })
  revisedById: number;
}
