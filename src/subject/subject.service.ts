import { Injectable } from "@nestjs/common";
import { Subject } from "@prisma/client";
import { validateForeignKeys } from "src/common/validation/custom-validation.pipe";
import { CreateSubjectDto } from "src/models/subject/create-subject.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class SubjectService {
    constructor(private readonly prisma: PrismaService, private readonly foreign: validateForeignKeys) { }
    async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {

        this.foreign.add(this.prisma.educationalPrograms.count({where: {id: createSubjectDto.educationalProgramId}}))
        this.foreign.validate()
        return await this.prisma.subject.create({
            data: {
                ...createSubjectDto,
            },
        });
    }
}