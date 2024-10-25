import { PartialType } from "@nestjs/swagger";
import { CreateCommentDto } from "./create-comment.dto";
import { IsString, Max } from "class-validator";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsString({
        message: 'El comentario debe ser un texto'
    })
    @Max(200, {
        message: 'El comentario no puede tener más de 200 caracteres'
    })
    comment: string;
}