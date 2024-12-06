import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEducationalProgramDto, CreateEducationalProgramsDto } from '../models/educationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/educationalPrograms/update-educational-program.dto';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { EducationalPrograms } from '@prisma/client';
import { APIResult } from '../common/api-results-interface';

@Injectable()
export class EducationalProgramsService {
  constructor(
    private prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) { }
  notFoundEducationalProgram = <APIResult<EducationalPrograms>>{
    message: 'Programa educativo no encontrado',
    error: null,
    data: null,
  }
  notFoundEducationalPrograms = <APIResult<EducationalPrograms[]>>{
    message: 'Programas educativos no encontrados',
    error: null,
    data: [],
  }
  /**
   * Method for creating a new educational program.
   * @param data Program data to register
   * @returns Registered Educational Program
   */
  async createProgram(
    educationalProgram: CreateEducationalProgramDto,
  ): Promise<APIResult<EducationalPrograms>> {
    try {
      await this.validateAreaId(educationalProgram.areaId);
      const newPartialTemplate = await this.prisma.educationalPrograms.create({
        data: educationalProgram,
      });

      return {
        message: 'Registrado con éxito',
        error: null,
        data: newPartialTemplate,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear el programa educativo',
      );
    }
  }

  async createManyPrograms(id: number, educationalPrograms: CreateEducationalProgramsDto[]) {
    try {
      await this.validateAreaId(id)
      const newEducationalPrograms: CreateEducationalProgramDto[] = educationalPrograms.map(program => ({ ...program, areaId: id }))
      const createdEducationalPrograms = await this.prisma.educationalPrograms.createMany({
        data: newEducationalPrograms
      })
      return {
        message: 'Programas educativos registrados con éxito',
        data: createdEducationalPrograms,
        error: null
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear los programas educativos'
      )
    }
  }
  /**
   * Method to consult all programs
   * @returns Returns all registered educational programs
   */
  async findAllPrograms(): Promise<APIResult<EducationalPrograms[]>> {
    try {
      const programs = await this.prisma.educationalPrograms.findMany({
        orderBy: [
          { areaId: 'asc', },
          { abbreviation: 'asc' }
        ]
      });
      if (programs.length === 0) return this.notFoundEducationalPrograms
      return {
        message: 'Programas educativos encontrados',
        error: null,
        data: programs,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar programas educativos',
      );
    }
  }

  /**
   * Method to find an educational program by its id.
   * @param id ID of the program to find
   * @returns Educational program
   * @throws NotFoundException if program is not found
   */
  async findProgramById(id: number): Promise<APIResult<EducationalPrograms>> {
    try {
      const educationalProgram =
        await this.prisma.educationalPrograms.findUnique({
          where: { id },
        });

      if (!educationalProgram) return this.notFoundEducationalProgram
      return {
        data: educationalProgram,
        error: null,
        message: 'Programa educativo encontrado',
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar el programa educativo',
      );
    }
  }

  async findByArea(areaId: number): Promise<APIResult<EducationalPrograms[]>> {
    try {
      const educationalPrograms = await this.prisma.educationalPrograms.findMany({
        where: { areaId },
        orderBy: [
          { abbreviation: 'asc' }
        ]
      });
      if (educationalPrograms.length === 0) return this.notFoundEducationalPrograms
      return {
        message: 'Programas educativos encontrados',
        error: null,
        data: educationalPrograms,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar el programa educativo',
      );
    }
  }
  async findOneJoinSubject(id: number): Promise<APIResult<EducationalPrograms>> {
    try {
      const educationalProgram = await this.prisma.educationalPrograms.findUnique({
        where: { id },
        include: { subjects: true }
      })
      if (!educationalProgram) return this.notFoundEducationalProgram
      return {
        message: 'Programa educativo encontrado',
        error: null,
        data: educationalProgram
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar el programa educativo',
      );
    }
  }
  async findAllJoinSubject(): Promise<APIResult<EducationalPrograms[]>> {
    try {
      const educationalPrograms = await this.prisma.educationalPrograms.findMany({
        include: { subjects: true }
      })
      if (educationalPrograms.length === 0) return this.notFoundEducationalPrograms
      return {
        message: 'Programas educativos encontrados',
        error: null,
        data: educationalPrograms
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar los programas educativos',
      );
    }
  }
  /**
   * Method to update a program using its id
   * @param id id of the program to update
   * @param updateEducationalProgramDto Program data to update
   * @returns Returns the updated program
   */
  async updateProgram(
    id: number,
    updateEducationalProgramDto: UpdateEducationalProgramDto,
  ): Promise<APIResult<EducationalPrograms>> {
    try {
      if (updateEducationalProgramDto.areaId) {
        await this.validateAreaId(updateEducationalProgramDto.areaId);
      }

      await this.findProgramById(id);
      const updatedProgram = await this.prisma.educationalPrograms.update({
        data: updateEducationalProgramDto,
        where: { id },
      });

      return {
        message: 'Actualización exitosa',
        error: null,
        data: updatedProgram,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al actualizar el programa educativo',
      );
    }
  }

  /**
   * *Method to delete a program
   * @param id id of the program to delete
   * @returns Return a message after deleting a program
   */

  async removeProgram(
    id: number,
  ): Promise<APIResult<EducationalPrograms>> {
    try {
      await this.findProgramById(id);
      const deletedEducationalProgram = await this.prisma.educationalPrograms.delete({
        where: { id },
      });
      return {
        data: deletedEducationalProgram,
        error: null,
        message: 'Eliminado Correctamente',
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al eliminar el programa educativo',
      );
    }
  }

  /**
   * Validates if foreign keys (areaId, responsibleId, revisedById)
   * @param {areaId} id - if
   * @throws {NotFoundException} - If any foreign keys is not found
   */
  private async validateAreaId(
    areaId: number
  ): Promise<void> {
    const validations = [];

    if (typeof areaId !== 'number') {
      throw new Error(
        `Tipo de areaId inválido: se esperaba un número, se recibió ${typeof areaId}`,
      );
    }
    validations.push(
      this.prisma.area.count({ where: { id: areaId } }).then((count) => {
        if (count === 0) {
          throw new NotFoundException(`Área con ID ${areaId} no existe`);
        }
      }),
    );
    await Promise.all(validations);
  }

}

