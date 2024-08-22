import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateTemplateDto {
  @ApiProperty({
    description: 'Estado de aprobación de la plantilla',
    example: 'pendiente, aprovado o corección',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El campo estado tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo estado no puede estar vacio' })
  state?: string;

  @ApiProperty({
    description: 'ID del área a la que pertenece la plantilla ',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: "El campo 'área' tiene que ser un numero entero" })
  @IsNotEmpty({ message: "El campo 'área' no puede estar vacio" })
  @Min(1, {
    message: "El campo 'área' tiene que ser un número entero positivo",
  })
  areaId?: number;

  @ApiProperty({
    description: 'Periodo a la que pertenece la plantilla',
    example: 'enero - abril 2023: Ordinario',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El campo periodo tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo periodo no puede estar vacio' })
  period?: string;

  @ApiProperty({
    description: 'ID del usuario responsable de la plantilla',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: "El campo 'responsable' tiene que ser un numero entero" })
  @IsNotEmpty({ message: "El campo 'responsable' id no puede estar vacio" })
  @Min(1, {
    message:
      "El campo 'responsable' id tiene que ser un número entero positivo",
  })
  responsibleId?: number;

  @ApiProperty({
    description: 'ID del usuario que revisó la plantilla',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: "El campo 'revisado por' tiene que ser un numero entero" })
  @IsNotEmpty({ message: "El campo 'revisado por' no puede estar vacio" })
  @Min(1, {
    message: "El campo 'revisado por' tiene que ser un número entero positivo",
  })
  revisedById?: number;
}
