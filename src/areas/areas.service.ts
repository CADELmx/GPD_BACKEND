
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { Area } from '@prisma/client';
import { CreateAreaDto } from '../models/area/create-area.dto';
import { UpdateAreaDto } from '../models/area/update-area.dto';

export interface AreasResult {
  message: string;
  error: string | null;
  data: Area[];
}

export interface AreaResult {
  message: string,
  error: string | null,
  data: Area | null
}

@Injectable()
export class AreasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) { }
  notFoundAreasResult = {
    message: 'Sin areas encontradas' as string,
    error: null as string,
    data: [] as Area[],
  }
  notFoundAreaResult = {
    message: 'Área no encontrada' as string,
    error: null as null,
    data: null as null,
  }
  /**
   * Creates a new area.
   * @param createAreaDto - Data Transfer Object for creating a new area.
   * @returns A promise that resolves with a message, any error encountered, and the created area data.
   */
  async create(
    createAreaDto: CreateAreaDto,
  ): Promise<AreaResult> {
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
  /**
   * Creates multiple new areas.
   * @param createAreaDto - Array of Data Transfer Objects for creating new areas.
   * @returns A promise that resolves with a message,any error encountered, and the counter of the created areas.
   */
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
  async findAll(): Promise<AreasResult> {
    try {
      const areas = await this.prisma.area.findMany({
        orderBy: {
          name: 'asc',
        },
      });
      if (areas.length === 0) return this.notFoundAreasResult
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
  ): Promise<AreaResult> {
    try {
      const area = await this.prisma.area.findUnique({
        where: {
          id,
        },
      });
      if (!area) return this.notFoundAreaResult
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
  ): Promise<AreasResult> {
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

      if (area.length === 0) return this.notFoundAreasResult
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
   * Returns areas that have only one worker (director).
   * @returns A promise that resolves with a message, any error encountered, and a list of areas that have only one worker (director).
   */
  async findDirectorAreas(): Promise<AreasResult> {
    const areas = await this.prisma.area.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    if (areas.length === 0) return this.notFoundAreasResult
    const personalDataPromises = areas.map((area) => {
      return this.prisma.personalData.findMany({
        where: {
          area: {
            contains: area.name,
            mode: 'insensitive',
          },
        },
        orderBy: {
          name: 'asc',
        },
        select: {
          name: true,
          ide: true,
          area: true,
          position: true,
        },
      })
    })
    const personalDataResults = await Promise.all(personalDataPromises)
    const personalData = personalDataResults
      .filter(personalData => personalData.length === 1)
      .map(personalData => personalData[0].area)
    const filteredAreas = areas.filter(area => personalData
      .map(str => str.toLowerCase().trim())
      .includes(area.name.toLowerCase().trim())
    )
    return {
      message: 'Áreas encontradas',
      error: null,
      data: filteredAreas,
    }
  }
  /**
   * Returns areas that have more than one worker.
   * @returns A promise that resolves with a message, any error encountered, and a list of areas that have more than one worker.
   */
  async findNotEmptyAreas(): Promise<AreasResult> {
    const areas = await this.prisma.area.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    if (areas.length === 0) return this.notFoundAreasResult
    const personalDataPromises = areas.map((area) => {
      return this.prisma.personalData.findMany({
        where: {
          area: area.name,
        },
        orderBy: {
          name: 'asc',
        },
        select: {
          name: true,
          ide: true,
          area: true,
          position: true,
        },
      })
    })
    const personalDataResults = await Promise.all(personalDataPromises)
    const personalData = personalDataResults
      .filter(personalData => personalData.length > 1)
      .map(personalData => personalData[0].area)
    const filteredAreas = areas.filter(area => personalData.includes(area.name))
    if (filteredAreas.length === 0) return this.notFoundAreasResult
    return {
      message: 'Áreas encontradas',
      error: null,
      data: filteredAreas,
    }
  }
  /**
   * Returns the count of educational programs per area.
   * @returns A promise that resolves with a message, any error encountered, and the count of educational programs per area.
   */
  async findAllEducationalProgramsCount(): Promise<AreasResult> {
    try {
      const areas = await this.prisma.area.findMany({
        include: {
          _count: {
            select: {
              educationalPrograms: true,
            }
          }
        },
        orderBy: [
          {
            educationalPrograms: {
              _count: 'desc'
            }
          },
          {
            name: 'asc',
          },
        ],
      })
      if (areas.length === 0) return this.notFoundAreasResult
      return {
        message: 'Áreas encontradas',
        error: null,
        data: areas,
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar las áreas',
      )
    }
  }
  /**
   * Retrieves an area based on the educational program ID.
   * @param id ID of the educational program
   * @returns a promise that resolves with a message, any error encountered, and the area that contains the educational program including their educational programs.
   */
  async findAreaBasedOnEducationalProgramId(id: number): Promise<AreaResult> {
    try {
      const area = await this.prisma.area.findFirst({
        where: {
          educationalPrograms: {
            some: {
              id,
            }
          }
        },
        include: {
          educationalPrograms: true,
        }
      })
      if (!area) return this.notFoundAreaResult
      return {
        message: 'Área encontrada',
        error: null,
        data: area,
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar el área',
      )
    }
  }
  /**
   * Returns all areas with their educational programs or the count of educational programs.
   * @returns A promise that resolves with a message, any error encountered, and the found areas with their educational programs or the count of educational programs.
   */
  async findAllJoinEducationalPrograms(): Promise<AreasResult> {
    try {
      const areas = await this.prisma.area.findMany({
        select: {
          _count: {
            select: {
              educationalPrograms: true,
            }
          },
          educationalPrograms: {
            select: {
              id: true,
              abbreviation: true,
              description: true,
            }
          },
          name: true,
          id: true,
        },
        orderBy: [
          {
            educationalPrograms: {
              _count: 'desc'
            }
          },
          {
            name: 'asc',
          }
        ],
      })
      if (areas.length === 0) return this.notFoundAreasResult
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
  ): Promise<AreaResult> {
    await this.validateIfExistsAreaId(id);
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
  ): Promise<AreaResult> {
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
