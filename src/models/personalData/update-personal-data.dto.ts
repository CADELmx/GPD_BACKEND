import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { CreatePersonalDataDto } from "./create-personal-data.dto";

export class UpdatePersonalDataDto extends PartialType(CreatePersonalDataDto) {
    @IsOptional()
    @IsInt({
        message: 'El número de trabajador debe ser un número entero'
    })
    @IsNotEmpty({
        message: 'El número de trabajador no puede estar vacío'
    })
    ide?: number;
    @IsOptional()
    @IsString({
        message: 'El nombre debe ser un texto'
    })
    @MaxLength(60,{
        message: 'El nombre no puede tener más de 60 caracteres'
    })
    @IsNotEmpty({
        message: 'El nombre no puede estar vacío'
    })
    name?: string;
    @IsOptional()
    @IsBoolean({
        message: 'El campo activo debe ser un booleano'
    })
    @IsNotEmpty({
        message: 'El campo activo no puede estar vacío'
    })
    active?: boolean;
    position?: string;
    area?: string;
    birthDate?: string;
    birthPlace?: string;
    birthState?: string;
    curp?: string;
    rfc?: string;
    militaryCard?: string;
    issstep?: string;
    gender?: string;
    maritalStatus?: string;
    phone?: string;
    mobile?: string;
    email?: string;
    institutionalMail?: string;
    address?: string;
    addressNumber?: string;
    colony?: string;
    population?: string;
    postalCode?: string;
    photo?: string;
    degree?: string;
    title?: string;
    titleComplete?: string;
}