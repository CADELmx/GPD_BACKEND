import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateTemplateDto {
  @IsString({ message: 'El campo estado tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo estado no puede estar vacío' })
  state: string = 'pendiente';

  @IsInt({ message: 'El campo area id tiene que ser un número entero' })
  @IsNotEmpty({ message: 'El campo area id no puede estar vacío' })
  @Min(1, {
    message: 'El campo are id tiene que ser un número entero positivo',
  })
  areaId: number;

  @IsString({ message: 'El campo periodo tiene que ser una cadena de texto' })
  @IsNotEmpty({ message: 'El campo periodo no puede estar vacío' })
  period: string;

  @IsInt({ message: 'El campo responsable id tiene que ser un número entero' })
  @IsNotEmpty({ message: 'El campo responsable id no puede estar vacío' })
  @Min(1, {
    message: 'El campo responsable id tiene que ser un número entero positivo',
  })
  responsibleId: number;

  @IsInt({ message: 'El campo revisado por id tiene que ser un número entero' })
  @IsNotEmpty({ message: 'El campo revisado por id no puede estar vacío' })
  @Min(1, {
    message: 'El campo revisado por id tiene que ser un número entero',
  })
  revisedById: number;
}
