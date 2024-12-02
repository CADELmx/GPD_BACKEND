import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEducationalProgramDto, CreateEducationalProgramsDto } from '../models/educationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/educationalPrograms/update-educational-program.dto';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { EducationalPrograms } from '@prisma/client';

@Injectable()
export class EducationalProgramsService {
  constructor(
    private prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) { }

  /**
   * Method for creating a new educational program.
   * @param data Program data to register
   * @returns Registered Educational Program
   */
  async createProgram(
    educationalProgram: CreateEducationalProgramDto,
  ): Promise<{
    message: string | null;
    error: string | null;
    data: EducationalPrograms | null;
  }> {
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
  async findAllPrograms(): Promise<any> {
    try {
      const programs = await this.prisma.educationalPrograms.findMany({
        orderBy: [
          { areaId: 'asc', },
          { abbreviation: 'asc' }
        ]
      });
      if (programs.length === 0) return {
        message: 'Sin programas educativos', error: null, data: []
      }
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
  async findProgramById(id: number): Promise<{
    data: EducationalPrograms | null;
    error: string | null;
    message: string;
  }> {
    try {
      const educationalProgram =
        await this.prisma.educationalPrograms.findUnique({
          where: { id },
        });

      if (!educationalProgram) return {
        message: 'Programa educativo no encontrado',
        error: null,
        data: null,
      }
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

  async findByArea(areaId: number): Promise<{
    error: string | null;
    data: EducationalPrograms[];
    message: string;
  }> {
    try {
      const educationalPrograms = await this.prisma.educationalPrograms.findMany({
        where: { areaId },
        orderBy: [
          { abbreviation: 'asc' }
        ]
      });
      if (educationalPrograms.length === 0) return {
        message: 'Sin programas educativos',
        error: null,
        data: educationalPrograms
      }
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
  async findOneJoinSubject(id: number) {
    try {
      const educationalProgram = await this.prisma.educationalPrograms.findUnique({
        where: { id },
        include: { subjects: true }
      })
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar el programa educativo',
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
  ): Promise<{
    message: string | null;
    error: string | null;
    data: EducationalPrograms | null;
  }> {
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
  ): Promise<{ message: string; error: string | null; data: null }> {
    try {
      await this.findProgramById(id);
      await this.prisma.educationalPrograms.delete({
        where: { id },
      });
      return {
        data: null,
        error: null,
        message: 'Eliminada Correctamente',
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

