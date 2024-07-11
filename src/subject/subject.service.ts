import { Injectable, NotFoundException } from "@nestjs/common";
import { Subject } from "@prisma/client";
import { validateForeignKeys } from "src/common/validation/custom-validation.pipe";
import { CreateSubjectDto } from "src/models/subject/create-subject.dto";
import { UpdateSubjectDto } from "src/models/subject/update-subject.dto";
import { PrismaService } from "src/prisma.service";

interface SubjectResult {
    create(createSubjectDto: CreateSubjectDto): Promise<{ message: string, data: Subject, error: string | null }>
    findByProgram(id: number): Promise<{ message: string, data: Subject[] | null, error: string | null }>
    findOne(id: number): Promise<{ message: string, data: Subject | null, error: null | string }>
    findAll(): Promise<{ message: string, data: Subject[], error: null | string }>
    update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<{ message: string, data: Subject, error: null | string }>
}

@Injectable()
export class SubjectService implements SubjectResult {
    constructor(
        private readonly prisma: PrismaService,
        private readonly foreign: validateForeignKeys
    ) { }
    async create(createSubjectDto: CreateSubjectDto) {
        this.foreign.add(this.prisma.educationalPrograms.count({ where: { id: createSubjectDto.educationalProgramId } }))
        this.foreign.validate()
        try {
            const subject = await this.prisma.subject.create({
                data: {
                    ...createSubjectDto,
                },
            })
            return {
                data: subject,
                error: null,
                message: 'Registrado!'
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error de registro',
                message: 'Error al registrar la materia'
            }
        }
    }
    async findByProgram(id: number) {
        try {
            const subjects = await this.prisma.subject.findMany({
                where: {
                    educationalProgramId: id
                },
                orderBy: { monthPeriod: 'asc', subjectName: 'asc' }
            });
            if (!subjects) throw new NotFoundException("No se encontraron materias");
            return {
                message: 'Materias econtradas',
                data: subjects,
                error: null
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error al buscar materias',
                message: 'Error al buscar las materias en el sistema'
            }
        }
    }
    async findOne(id: number) {
        try {
            const subject = await this.prisma.subject.findFirst({
                where: { id }
            })
            const message = subject ? 'Materia econtrada' : 'Materia no econtrada'
            return {
                data: subject,
                error: null,
                message
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error de búsqueda',
                message: 'Error al buscar la materia'
            }
        }
    }
    async findAll() {
        try {
            const subjects = await this.prisma.subject.findMany({ orderBy: { educationalProgramId: 'asc', monthPeriod: 'asc', subjectName: 'asc' } });
            const message = subjects ? 'Todas las materias de todas las carreras' : 'No se encontraron materias'
            return {
                data: subjects,
                message,
                error: null
            }
        } catch (error) {
            return {
                data: null,
                error: 'Error de búsqueda',
                message: 'Error al obtener las materias'
            }
        }
    }
    async update(id: number, updateSubjectDto: UpdateSubjectDto) {
        try {
            this.findOne(id);
            const updated = await this.prisma.subject.update({
                where: {
                    id
                },
                data: {
                    ...updateSubjectDto
                }
            });
            return {
                data: updated,
                message: "Actualizado!",
                error: null
            };
        } catch (error) {
            return {
                data: null,
                error: 'Error de actualización',
                message: 'Error al actualizar el registro'
            }
        }
    }
}