import { IsInt, IsString, MaxLength, Min } from "class-validator";

export class CreateCommentDto {
    @IsString({
        message: 'El comentario debe ser un texto'
    })
    @MaxLength(200, {
        message: 'El comentario no puede tener más de 200 caracteres'
    })
    comment: string;
    @IsInt({
        message: 'El id de la plantilla parcial debe ser un número'
    })
    @Min(1, {
        message: 'El id de la plantilla debe ser mayor a 0'
    })
    partialtemplateId: number;
}