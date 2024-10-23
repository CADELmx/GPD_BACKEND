import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

@Injectable()
export class CommentsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly prismaErrorHandler: PrismaErrorHandler
    ) { }

    async create(createCommnetDto: any) {
        try {
            const response = await this.prisma.comments.create({
                data: createCommnetDto
            })
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
                data: null
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
    async update(id: number, updateCommentDto: any) {
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
    async delete() {
        
    }
}
