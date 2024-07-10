import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Subject } from "@prisma/client";
import { validateForeignKeys } from "src/common/validation/custom-validation.pipe";
import { CreateSubjectDto } from "src/models/subject/create-subject.dto";
import { UpdateSubjectDto } from "src/models/subject/update-subject.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SubjectService {
    constructor(private readonly prisma: PrismaService, private readonly foreign: validateForeignKeys) { }
    async create(createSubjectDto: CreateSubjectDto): Promise<{ message: string }> {

        this.foreign.add(this.prisma.educationalPrograms.count({ where: { id: createSubjectDto.educationalProgramId } }))
        this.foreign.validate()
        const created = await this.prisma.subject.create({
            data: {
                ...createSubjectDto,
            },
        });
        if (!created) throw new HttpException("Error al registrar materia", 500);
        return {
            message: "Registrado!"
        };
    }
    async findByProgram(id: number): Promise<Subject[]> {
        const subjects = await this.prisma.subject.findMany({
            where: {
                educationalProgramId: id
            },
            orderBy: { monthPeriod: 'asc', subjectName: 'asc' }
        });
        if (!subjects) throw new NotFoundException("No se encontraron materias");
        return subjects;
    }
    async findOne(id: number): Promise<Subject> {
        const subject = await this.prisma.subject.findUnique({
            where: {
                id
            }
        });
        if (!subject) throw new NotFoundException("No se encontró la materia");
        return subject;
    }
    async findAll(): Promise<Subject[]> {
        const subjects = await this.prisma.subject.findMany({ orderBy: { educationalProgramId: 'asc', monthPeriod: 'asc', subjectName: 'asc' } });
        if (!subjects) throw new NotFoundException("No se encontraron materias");
        return subjects;
    }
    async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<{ message: string }> {
        this.findOne(id);
        const updated = await this.prisma.subject.update({
            where: {
                id
            },
            data: {
                ...updateSubjectDto
            }
        });
        if (!updated) throw new HttpException("Error al actualizar materia", 500);
        return {
            message: "Actualizado!"
        };
    }
}