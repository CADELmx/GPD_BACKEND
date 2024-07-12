import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from 'src/models/area/create-area.dto';
import { UpdateAreaDto } from 'src/models/area/update-area.dto';

@Injectable()
export class AreasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAreaDto: CreateAreaDto): Promise<any> {
    try {
      const area = await this.prisma.area.create({
        data: {
          ...createAreaDto,
        },
      });
      return {
        message: 'Área registrada',
        error: null,
        data: area,
      };
    } catch (error) {
      return {
        message: 'Error al registrar el área',
        error: error.message,
        data: null,
      };
    }
  }

  async findAll() {
    try {
      const areas = await this.prisma.area.findMany();

      if (areas.length === 0) {
        return {
          message: 'No hay áreas registradas',
          error: null,
          data: [],
        };
      }

      return {
        message: 'Áreas encontradas',
        error: null,
        data: areas,
      };
    } catch (error) {
      return {
        message: 'Error al obtener las áreas',
        error: error.message,
        data: null,
      };
    }
  }

  async findOneById(id: number): Promise<any> {
    try {
      const area = await this.prisma.area.findMany({
        where: {
          id,
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
      return {
        message: 'Error al obtener el área',
        error: error.message,
        data: null,
      };
    }
  }

  async findOneByName(name: string): Promise<any> {
    try {
      const area = await this.prisma.area.findMany({
        where: {
          name,
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
      return {
        message: 'Error al obtener el área',
        error: error.message,
        data: null,
      };
    }
  }

  async update(id: number, updateAreaDto: UpdateAreaDto): Promise<any> {
    try {
      const area = await this.prisma.area.update({
        where: {
          id,
        },
        data: {
          ...updateAreaDto,
        },
      });
      return {
        message: 'Área actualizada',
        error: null,
        data: area,
      };
    } catch (error) {
      return {
        message: 'Error al actualizar el área',
        error: error.message,
        data: null,
      };
    }
  }

  async remove(id: number): Promise<any> {
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
      return {
        message: 'Error al eliminar el área',
        error: error.message,
        data: null,
      };
    }
  }

  private async validateIfExistsAreaId(id: number) {
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
