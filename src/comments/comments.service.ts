import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { CreateCommentDto } from '../models/comments/create-comment.dto';
import { UpdateCommentDto } from '../models/comments/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly prismaErrorHandler: PrismaErrorHandler
    ) { }

    async create(createCommentDto: CreateCommentDto) {
        console.log(createCommentDto);
        try {
            const comment = await this.prisma.comments.create({
                data: createCommentDto
            })
            return {
                message: 'Comentario registrado con éxito',
                error: null,
                data: comment
            }
        } catch (error) {
            this.prismaErrorHandler.handleError(
                error,
                'Error al registrar el comentario'
            )
        }
    }

    async findOne(id: number) {
        try {
            const comment = await this.prisma.comments.findUnique({
                where: { id }
            })
            if (comment) return {
                message: 'Comentario obtenido con éxito',
                error: null,
                data: comment
            }
            return {
                message: 'No se encontró el comentario',
                error: null,
                data: null
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al obtener el comentario'
            )
        }
    }

    async findAll() {
        try {
            const comments = await this.prisma.comments.findMany()
            if (comments.length === 0) return {
                message: 'No hay comentarios para mostrar',
                error: null,
                data: []
            }
            return {
                message: 'Comentarios obtenidos con éxito',
                error: null,
                data: comments
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al obtener los comentarios'
            )
        }
    }
    async update(id: number, updateCommentDto: UpdateCommentDto) {
        console.log(UpdateCommentDto)
        try {
            const result = await this.prisma.comments.update({
                where: {
                    id,
                },
                data: updateCommentDto
            })
            return {
                message: 'Comentario actualizado',
                error: null,
                data: result
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al actualizar el comentario'
            )
        }
    }
    async delete(id: number) {
        try {
            const result = await this.prisma.comments.delete({
                where: {
                    id
                }
            })
            return {
                message: 'El comentario ha sido eliminado',
                error: null,
                data: result
            }
        } catch (error) {
            console.log(error)
            return this.prismaErrorHandler.handleError(
                error,
                'Error al eliminar el comentario'
            )
        }
    }
    /**
     * Retrieves the comment of a specific 0partial template
     * @param id The partial template ID
     * @returns the comment of the partial template
     */
    async findByPartialTemplate(id: number) {
        try {
            const comment = await this.prisma.comments.findUnique({
                where: {
                    id
                }
            })
            console.log(comment)
            if (comment) return {
                message: 'No hay comentario para mostrar',
                error: null,
                data: null
            }
            return {
                message: 'Comentario obtenido con éxtio',
                error: null,
                data: comment
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al obtener el comentario'
            )
        }
    }
}
