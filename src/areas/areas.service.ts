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

  findAll() {
    return `This action returns all areas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
