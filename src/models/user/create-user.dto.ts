import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString({
        message: 'El email debe ser un texto',
    })
    @IsNotEmpty({
        message: 'El email es requerido',
    })
    @IsEmail({}, {
        message: 'El email no es válido',
    })
    email: string;
    @IsString({
        message: 'La contraseña debe ser un texto',
    })
    @IsNotEmpty({
        message: 'La contraseña es requerida',
    })
    password: string;
    @IsInt({
        message: 'El número de trabajador debe ser un número entero',
    })
    @IsNotEmpty({
        message: 'El número de trabajador es requerido',
    })
    nt: number;
    @IsBoolean({
        message: 'El campo activo debe ser un booleano',
    })
    @IsNotEmpty({
        message: 'El campo activo es requerido',
    })
    active: boolean;
}