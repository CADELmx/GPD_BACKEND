import { ApiProperty } from "@nestjs/swagger";
import { EducationalPrograms } from "@prisma/client";

export class EduProgramsEntity implements EducationalPrograms {

    @ApiProperty()
    id: bigint;

    @ApiProperty({required: true, description: "Abrebiacion del programa educativo"})
    abbreviation: string;

    @ApiProperty({required: true, description: "Descripcion del programa educativo"})
    description: string;

  
    @ApiProperty({required: true, description: "Id del area alque pertenece"})
    areaId: bigint;

}