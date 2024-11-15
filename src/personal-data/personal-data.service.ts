import { Injectable } from '@nestjs/common';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';
import { CreatePersonalDataDto } from 'src/models/personalData/create-personal-data.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PersonalDataService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly prismaErrorHandler: PrismaErrorHandler,
    ) { }
    personalDataSelector = {
        id: true,
        ide: true,
        name: true,
        active: true,
        area: true,
        position: true,
    }
    partialTemplateSelector = {
        id: true,
        status: true,
        year: true,
        total: true
    }
    async create(createPersonalDataDto: CreatePersonalDataDto) {
        try {
            const newPersonalData = await this.prisma.personalData.create({
                data: createPersonalDataDto,
            })
            return {
                message: 'Trabajador registrado correctamente',
                error: null,
                data: newPersonalData
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al registrar trabajador',
            )
        }
    }
    async createMany(createPersonalDataDto: CreatePersonalDataDto[]) {
        try {
            const newPersonalData = await this.prisma.personalData.createMany({
                data: createPersonalDataDto,
            })
            return {
                message: 'Trabajadores registrados correctamente',
                error: null,
                data: newPersonalData
            }
        } catch (error) {
            console.log(error)
            return this.prismaErrorHandler.handleError(
                error,
                'Error al registrar trabajadores',
            )
        }
    }
    async findAll(active?: boolean) {
        const filter = active ? { active } : {}
        try {
            const personalData = await this.prisma.personalData.findMany({
                where: filter,
                select: this.personalDataSelector
            })
            if (personalData.length === 0) return {
                message: 'No se encontraron trabajadores',
                error: null,
                data: personalData
            }
            return {
                message: 'Trabajadores obtenidos con éxito',
                error: null,
                data: personalData
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al consultar trabajadores',
            )
        }
    }
    async findOne(id: number) {
        try {
            const personalData = await this.prisma.personalData.findUnique({
                where: {
                    ide: id
                },
                select: this.personalDataSelector
            })
            if (personalData) return {
                message: 'Trabajador encontrado con éxito',
                error: null,
                data: personalData
            }
            return {
                message: 'Trabajador no encontrado',
                error: null,
                data: null
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al buscar trabajador',
            )
        }
    }
    findOneJoinPartialTemplate(id: number) {
        try {
            const personalDataWithPartialTemplate = this.prisma.personalData.findUnique({
                where: {
                    ide: id
                },
                include: {
                    partialTemplates: {
                        select: this.partialTemplateSelector
                    }
                }
            })
            if (personalDataWithPartialTemplate) return {
                message: 'Trabajador encontrado con éxito',
                error: null,
                data: personalDataWithPartialTemplate
            }
            return {
                message: 'Trabajador no encontrado',
                error: null,
                data: null
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al buscar trabajador',
            )
        }
    }
    async findAllJoinPartialTemplate(active?: boolean) {
        const filter = active ? { active } : {}
        try {
            const personalDataWithPartialTemplate = await this.prisma.personalData.findMany({
                where: filter,
                include: {
                    partialTemplates: {
                        select: this.partialTemplateSelector
                    }
                }
            })
            if (personalDataWithPartialTemplate.length === 0) return {
                message: 'No se encontraron trabajadores',
                error: null,
                data: null
            }
            return {
                message: 'Trabajadores encontrados con éxito',
                error: null,
                data: personalDataWithPartialTemplate
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al buscar trabajadores',
            )
        }
    }
    async update(id: number, data: CreatePersonalDataDto) {
        try {
            const updatedPersonalData = await this.prisma.personalData.update({
                where: {
                    ide: id
                },
                data
            })
            return {
                message: 'Trabajador actualizado con éxito',
                error: null,
                data: updatedPersonalData
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al actualizar trabajador',
            )
        }
    }
    async delete(id: number) {
        try {
            const deletedPersonalData = await this.prisma.personalData.delete({
                where: {
                    id
                }
            })
            return {
                message: 'Trabajador eliminado con éxito',
                error: null,
                data: deletedPersonalData
            }
        } catch (error) {
            return this.prismaErrorHandler.handleError(
                error,
                'Error al eliminar trabajador',
            )
        }
    }
}
