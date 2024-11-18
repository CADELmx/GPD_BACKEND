
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { Area } from '@prisma/client';
import { CreateAreaDto } from '../models/area/create-area.dto';
import { UpdateAreaDto } from '../models/area/update-area.dto';

@Injectable()
export class AreasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) { }

  /**
   * Creates a new area.
   * @param createAreaDto - Data Transfer Object for creating a new area.
   * @returns A promise that resolves with a message, any error encountered, and the created area data.
   */
  async create(
    createAreaDto: CreateAreaDto,
  ): Promise<{ message: string; error: string | null; data: Area | null }> {
    try {
      const area = await this.prisma.area.create({
        data: createAreaDto,
      });
      return {
        message: 'Área registrada',
        error: null,
        data: area,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear el área',
      );
    }
  }
  async createMany(createAreaDto: CreateAreaDto[]) {
    try {
      const areas = await this.prisma.area.createMany({
        data: createAreaDto,
      })
      return {
        message: 'Áreas registradas',
        error: null,
        data: areas,
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear las áreas',
      )
    }
  }
  /**
   * Retrieves all areas.
   * @returns A promise that resolves with a message, any error encountered, and a list of areas.
   */
  async findAll(): Promise<{
    message: string;
    error: string | null;
    data: Area[] | null;
  }> {
    try {
      const areas = await this.prisma.area.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      if (areas.length === 0) return {
        message: 'No hay áreas registradas',
        error: null,
        data: [],
      }
      return {
        message: 'Áreas encontradas',
        error: null,
        data: areas,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar las áreas',
      );
    }
  }

  /**
   * Retrieves an area by its ID.
   * @param id - The ID of the area to retrieve.
   * @returns A promise that resolves with a message, any error encountered, and the area data.
   */
  async findOneById(
    id: number,
  ): Promise<{ message: string; error: string | null; data: Area[] | null }> {
    try {
      await this.validateIfExistsAreaId(id);

      const area = await this.prisma.area.findMany({
        where: {
          id,
        },
        orderBy: {
          name: 'asc',
        },
      });

      if (area.length === 0) {
        return {
          message: 'Area no encontrada',
          error: null,
          data: area,
        };
      }

      return {
        message: 'Área obtenida con éxito',
        error: null,
        data: area,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar el área',
      );
    }
  }

  /**
   * Retrieves areas that contain the specified name.
   * @param name - The name to search for.
   * @returns A promise that resolves with a message, any error encountered, and a list of areas matching the name.
   */
  async findOneByName(
    name: string,
  ): Promise<{ message: string; error: string | null; data: Area[] | null }> {
    try {
      const area = await this.prisma.area.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      if (area.length === 0) {
        return {
          message: 'Área no encontrada',
          error: null,
          data: area,
        };
      }

      return {
        message: 'Área obtenida con éxito',
        error: null,
        data: area,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar el área',
      );
    }
  }

  async findAllJoinEducationalPrograms() {
    try {
      const areas = await this.prisma.area.findMany({
        include: {
          educationalPrograms: {
            select: {
              id: true,
              abbreviation: true,
              description: true,
            }
          },
        },
        orderBy: {
          name: 'asc',
        },
      })
      if (areas.length === 0) return {
        message: 'No hay áreas registradas',
        error: null,
        data: [],
      }
      return {
        message: 'Áreas encontradas',
        error: null,
        data: areas,
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar las áreas',
      );
    }
  }
  /**
   * Updates an area by its ID.
   * @param id - The ID of the area to update.
   * @param updateAreaDto - Data Transfer Object for updating an area.
   * @returns A promise that resolves with a message, any error encountered, and the updated area data.
   */
  async update(
    id: number,
    updateAreaDto: UpdateAreaDto,
  ): Promise<{ message: string; error: string | null; data: Area | null }> {
    try {
      const area = await this.prisma.area.update({
        where: {
          id,
        },
        data: updateAreaDto,
      });

      return {
        message: 'Área actualizada',
        error: null,
        data: area,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al actualizar el área',
      );
    }
  }

  /**
   * Deletes an area by its ID.
   * @param id - The ID of the area to delete.
   * @returns A promise that resolves with a message, any error encountered, and the deleted area data.
   */
  async remove(
    id: number,
  ): Promise<{ message: string; error: string | null; data: Area | null }> {
    await this.validateIfExistsAreaId(id);
    try {
      const area = await this.prisma.area.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Área eliminada',
        error: null,
        data: area,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al eliminar el área',
      );
    }
  }

  /**
   * Validates if an area exists by its ID.
   * @param id - The ID of the area to validate.
   * @throws NotFoundException if the area does not exist.
   */
  private async validateIfExistsAreaId(id: number): Promise<void> {
    const area = await this.prisma.area.findUnique({
      where: {
        id,
      },
    });

    if (!area) {
      throw new NotFoundException(`Área con ID ${id} no encontrada`);
    }
  }
}
