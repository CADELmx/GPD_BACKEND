import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAreaDto } from 'src/models/area/create-area.dto';

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

  async findOne(id: number): Promise<any> {
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

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
