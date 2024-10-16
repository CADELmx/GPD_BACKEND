import { Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';
import { CreateActivityDto } from 'src/models/activity/create-activity.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateActivityDto } from '../models/activity/create-activity.dto';

@Injectable()
export class ActivityService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly prismaErrorHandler: PrismaErrorHandler,
    ) { }
    async create(createActivityDto: CreateActivityDto): Promise<any> {
        try {
            const activity = await this.prisma.activity.create({
                data: createActivityDto as any //this will be changed in the future, is not the correct approach
            })
            return {
                message: 'Actividad academica registrada',
                error: null,
                data: activity
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(error, 'Error al crear la actividad academica')
        }
    }

    async findAll(): Promise<any> {
        try {
            const activities = await this.prisma.activity.findMany()
            if (activities.length === 0) {
                return {
                    message: 'No se encontraron actividades academicas',
                    error: null,
                    data: []
                }
            }
            return {
                message: 'Actividades academicas obtenidas con exito',
                error: null,
                data: activities
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(error, 'Error al obtener las actividades academicas')
        }
    }

    async findOne(id: string): Promise<any> {
        try {
            const activities = await this.prisma.activity.findMany({
                where: {
                    id
                }
            })
            if(activities.length === 0){
                return {
                    message: 'No se encontro la actividad academica',
                    error: null,
                    data: []
                }
            }
            return {
                message: 'Actividad academica obtenida con exito',
                error: null,
                data: activities
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(error, 'Error al obtener la actividad academica')
        }
    }

    async update(id: string, updateActivityDto: any): Promise<any> {
        try {
            const activity = await this.prisma.activity.update({
                where: {
                    id,
                },
                data: updateActivityDto
            })
            return {
                message: 'Actividad academica actualizada',
                error: null,
                data: activity
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(error, 'Error al actualizar la actividad academica')
        }
    }

    async remove(id: string): Promise<any> {
        try {
            const activity = await this.prisma.activity.delete({
                where: {
                    id
                }
            })
            return {
                message: 'Actividad academica eliminada',
                error: null,
                data: activity
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(error, 'Error al eliminar la actividad academica')
        }
    }

    async removeMany(id: number): Promise<any> {
        try {
            const result = await this.prisma.activity.deleteMany({
                where:{
                    partialTemplateId: id
                }
            })
            return {
                message: 'Se eliminaron las actividades academicas',
                error: null,
                data: result
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(error, 'Error al eliminar las actividades academicas')
        }
    }
}
