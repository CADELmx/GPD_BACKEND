import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEducationalProgramDto } from '../models/EducationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/EducationalPrograms/update-educational-program.dto';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { EducationalPrograms } from '@prisma/client';

@Injectable()
export class EducationalProgramsService {
  constructor(
    private prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) {}

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
      await this.validateAreaId(educationalProgram);
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

  /**
   * Method to consult all programs
   * @returns Returns all registered educational programs
   */
  async findAllPrograms(): Promise<any> {
    try {
      const programs = await this.prisma.educationalPrograms.findMany();

      if (programs.length === 0) {
        return { message: 'Sin programas educativos', error: null, data: null };
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

      if (!educationalProgram) {
        throw new NotFoundException(
          `Programa educativo con ID ${id} no encontrado`,
        );
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
      await this.validateAreaId(updateEducationalProgramDto);

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
    confirmed: boolean,
  ): Promise<{ message: string; error: string | null; data: null }> {
    try {
      if (!confirmed) {
        return {
          data: null,
          error: 'No confirmado',
          message: 'No se ha confirmado la eliminación',
        };
      }
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
   * @param {CreateEducationalProgramDto | UpdateEducationalProgramDto} dto - Data to validate
   * @throws {NotFoundException} - If any foreign keys is not found
   */
  private async validateAreaId(
    dto: CreateEducationalProgramDto | UpdateEducationalProgramDto,
  ): Promise<void> {
    const { areaId } = dto;
    const validations = [];

    if (areaId !== undefined) {
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
    }

    await Promise.all(validations);
  }
}
