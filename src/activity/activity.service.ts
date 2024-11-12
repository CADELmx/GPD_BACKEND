import { Injectable } from '@nestjs/common';
import { CreateActivitiesDto, CreateActivityDto } from '../models/activity/create-activity.dto';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

@Injectable()
export class ActivityService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly prismaErrorHandler: PrismaErrorHandler,
    ) { }
    async create(createActivityDto: CreateActivityDto): Promise<any> {
        try {
            const activity = await this.prisma.activity.create({
                data: createActivityDto
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

    async createMany(id: number, createActivities: CreateActivitiesDto[]): Promise<any> {
        try {
            const activities: CreateActivityDto[] = createActivities.map((dto) => {
                return ({
                    ...dto,
                    partialTemplateId: id
                })
            })
            const registeredActivities = await this.prisma.activity.createMany({
                data: createActivities
            })
            return {
                message: 'Actividades academicas registradas',
                error: null,
                data: registeredActivities
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(error, 'Error al crear las actividades academicas')
        }
    }

    async findAll() {
        try {
            const activities = await this.prisma.activity.findMany()
            if (activities.length === 0) return {
                message: 'No se encontraron actividades academicas',
                error: null,
                data: []
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

    async findOne(id: string) {
        try {
            const activities = await this.prisma.activity.findMany({
                where: {
                    id
                }
            })
            if (activities.length === 0) return {
                message: 'No se encontro la actividad academica',
                error: null,
                data: []
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

    async findByPartialTemplate(id: number) {
        try {
            const activitiesByTemplate = await this.prisma.activity.findMany({
                where: {
                    partialTemplateId: id
                }
            })
            if (activitiesByTemplate.length === 0) return {
                message: 'No hay actividades académicas para mostrar',
                error: null,
                data: []
            }
            return {
                message: 'Actividad académica obtenida con éxito',
                error: null,
                data: activitiesByTemplate
            }
        } catch (error) {
            this.prismaErrorHandler.handleError(
                error,
                'Error al obtener las actividades'
            )
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
                where: {
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
