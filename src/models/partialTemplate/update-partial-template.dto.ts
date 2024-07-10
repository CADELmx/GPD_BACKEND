import { PartialType } from '@nestjs/mapped-types';
import { CreatePartialTemplateDto } from './create-partial-template.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePartialTemplateDto extends PartialType(CreatePartialTemplateDto) {
  @IsString({ message: 'El campo name tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo name no puede estar vacío'})
  name: string;

  @IsString({ message: 'El campo gender tiene que ser una cadena de texto'})
  gender?: string;

  @IsString({ message: 'El campo position tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo position no puede estar vacío'})
  position?: string;

  @IsInt({ message: 'El campo total debe ser un número entero'})
  @IsNotEmpty({message: 'El campo total no puede estar vacío'})
  total?: number;

  @IsString({ message: 'El campo status tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo status no puede estar vacío'})
  status?: string;

  @IsString({ message: 'El campo year tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo year no puede estar vacío'}) 
  year?: string;

  @IsString({ message: 'El campo period tiene que ser una cadena de texto'})
  @IsNotEmpty({message: 'El campo period no puede estar vacío'})
  period?: string;

  @IsInt({ message: 'El campo templateId debe ser un número entero'})
  @IsNotEmpty({message: 'El campo templateId no puede estar vacío'})
  templateId: number;
}
