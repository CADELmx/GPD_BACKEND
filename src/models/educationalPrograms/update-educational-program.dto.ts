import { PartialType } from '@nestjs/mapped-types';
import { CreateEducationalProgramDto } from './create-educational-program.dto';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEducationalProgramDto extends PartialType(
  CreateEducationalProgramDto,
) {
  @IsOptional()
  @IsString({ message: 'La abreviatura debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La abreviatura es obligatoria' })
  abbreviation?: string;
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description?: string;
  @IsOptional()
  @IsInt({ message: 'El ID del área debe ser un número ' })
  @IsNotEmpty({ message: 'El ID del área es obligatorio' })
  @Min(1, { message: 'El Id del area debe ser un dato válido' })
  areaId?: number;
}
