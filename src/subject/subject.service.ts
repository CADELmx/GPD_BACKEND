import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Subject } from '@prisma/client';
import { CreateSubjectDto, CreateSubjectsDto } from '../models/subject/create-subject.dto';
import { UpdateSubjectDto } from '../models/subject/update-subject.dto';
import { PrismaService } from '../prisma.service';
import { validateForeignKeys } from '../common/validation/custom-validation.pipe';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { APIResult } from 'src/common/api-results-interface';

@Injectable()
export class SubjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly foreign: validateForeignKeys,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) { }
  /**
   * Creates a new subject
   * @param createSubjectDto data to create a new subject
   * @returns object with the new subject, a message and an error if ocurred
   */
  async create(createSubjectDto: CreateSubjectDto): Promise<APIResult<Subject>> {
    this.foreign.add(
      this.prisma.educationalPrograms.count({
        where: { id: createSubjectDto.educationalProgramId },
      }),
    );
    if (await this.foreign.validate())
      throw new BadRequestException('El programa educativo no existe');
    try {
      const subject = await this.prisma.subject.create({
        data: createSubjectDto,
      });
      return {
        data: subject,
        error: null,
        message: 'Registrado!',
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear la materia',
      );
    }
  }
  async createMany(id: number, createSubjectsDto: CreateSubjectsDto[]) {
    try {
      const newSubjects: CreateSubjectDto[] = createSubjectsDto.map((subject) => ({
        ...subject,
        educationalProgramId: id,
      }));
      const subjects = await this.prisma.subject.createMany({
        data: newSubjects,
      });
      return {
        data: subjects,
        error: null,
        message: 'Materias registradas',
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear las materias',
      );
    }
  }
  /**
   * Returns all subjects of an educational program
   * @param id the id of the educational program
   * @returns object with the subjects, a message and an error if ocurred
   */
  async findByProgram(id: number): Promise<APIResult<Subject[]>> {
    try {
      const subjects = await this.prisma.subject.findMany({
        where: {
          educationalProgramId: id,
        },
        orderBy: [{ monthPeriod: 'asc' }, { subjectName: 'asc' }],
      });
      const message =
        subjects.length === 0
          ? 'No se encontraron materias'
          : 'Materias econtradas';
      return {
        message,
        data: subjects,
        error: null,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al buscar la materia',
      );
    }
  }
  async findByProgramGroupedByPeriod(id: number): Promise<APIResult<{
    subjects: Subject[],
    period: string
  }[]>> {
    try {
      const periods = await this.prisma.subject.groupBy({
        by: ['monthPeriod'],
        where: {
          educationalProgramId: id,
        },
        orderBy: {
          monthPeriod: 'asc'
        }
      })
      const subjectPromises = periods.map(period => {
        return this.prisma.subject.findMany({
          where: {
            educationalProgramId: id,
            monthPeriod: period.monthPeriod,
          },
          orderBy: {
            totalHours: 'desc'
          }
        })
      })
      const subjectResults = await Promise.all(subjectPromises)
      const subjects = subjectResults.map((subject, index) => {
        return {
          period: periods[index].monthPeriod,
          subjects: subject
        }
      })
      return {
        data: subjects,
        error: null,
        message: 'Materias agrupadas por periodo'
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al buscar la materia',
      );
    }
  }
  /**
   * Returns a subject by its id
   * @param id id of the subject
   * @returns object with the subject, a message and an error if ocurred
   */
  async findOne(id: number): Promise<APIResult<Subject>> {
    try {
      const subject = await this.prisma.subject.findFirst({
        where: { id },
      });
      const message = subject ? 'Materia econtrada' : 'Materia no econtrada';
      return {
        data: subject,
        error: null,
        message,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al buscar la materia',
      );
    }
  }
  /**
   * Returns all subjects
   * @returns object with all subjects, a message and an error if ocurred
   */
  async findAll(): Promise<APIResult<Subject[]>> {
    try {
      const subjects = await this.prisma.subject.findMany({
        orderBy: [
          { educationalProgramId: 'asc' },
          { monthPeriod: 'asc' },
          { subjectName: 'asc' },
        ],
      });
      const message =
        subjects.length === 0
          ? 'No se encontraron materias'
          : 'Todas las materias de todas las carreras';
      return {
        data: subjects,
        message,
        error: null,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al buscar las materias',
      );
    }
  }
  /**
   * Updates a subject by its id
   * @param id id of the subject
   * @param updateSubjectDto data to update the subject
   * @returns object with the updated subject, a message and an error if ocurred
   */
  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<APIResult<Subject>> {
    try {
      this.foreign.add(this.prisma.subject.count({ where: { id } }));
      if (await this.foreign.validate())
        throw new NotFoundException('La materia no existe');
      const updated = await this.prisma.subject.update({
        where: {
          id,
        },
        data: updateSubjectDto,
      });
      return {
        data: updated,
        message: 'Actualizado!',
        error: null,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al actualizar la materia',
      );
    }
  }
  /**
   * Deletes a subject by its id
   * @param id id of the subject
   * @returns a message and an error if ocurred
   */
  async delete(id: number): Promise<APIResult<Subject>> {
    try {
      this.foreign.add(this.prisma.subject.count({ where: { id } }));
      if (await this.foreign.validate())
        throw new NotFoundException('La materia no existe');
      const deletedSubject = await this.prisma.subject.delete({
        where: {
          id,
        },
      });
      return {
        data: deletedSubject,
        error: null,
        message: 'Eliminado!',
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al eliminar la materia',
      );
    }
  }
}
