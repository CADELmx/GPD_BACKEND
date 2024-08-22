import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, min } from 'class-validator';

export class CreateEducationalProgramDto {
  @ApiProperty({required: true, description: "Abrebiacion del programa educativo"})
  @IsString({ message: 'La abreviatura debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La abreviatura es obligatoria' })
  abbreviation: string;

  @ApiProperty({required: true, description: "Descripcion del programa educativo"})
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  description: string;

  
  @ApiProperty({required: true, description: "Id del area alque pertenece"})
  @IsInt({ message: 'El ID del área debe ser un numero ' })
  @IsNotEmpty({ message: 'El ID del área es obligatorio' })
  @Min(1, { message: 'El Id del area debe ser un dato válido' })
  areaId: bigint;
}
