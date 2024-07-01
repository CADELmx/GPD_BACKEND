import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PartialTemplate } from '@prisma/client';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PartialTemplatesService {
  constructor(private readonly prisma: PrismaService){};

  async create(createPartialTemplateDto: CreatePartialTemplateDto): Promise <PartialTemplate> {
    const existingPartialTemplate =  await this.prisma.partialTemplate.findFirst({
      where: {
        name: createPartialTemplateDto.name,
      },
    });
    if (existingPartialTemplate){
      throw new BadRequestException('Ya existe una plantilla parcial con ese nombre');
    }

    return this.prisma.partialTemplate.create({
      data: {
        ...createPartialTemplateDto,
      },
    });
  }

  async findAll(): Promise <PartialTemplate[]> {
    return this.prisma.partialTemplate.findMany();
  }

  async findOne(partialTemplateId: number): Promise<PartialTemplate>{
    const partialTemplate = await this.prisma.partialTemplate.findUnique({
      where: {
        id: partialTemplateId
      },
    });
    if(!partialTemplate){
      throw new NotFoundException('Usuario no encontrado');
    }
    return partialTemplate;
  }

  async update(id: number, updatePartialTemplateDto: UpdatePartialTemplateDto): Promise<PartialTemplate> {
    await this.findOne(id);
    return this.prisma.partialTemplate.update({
      data: { ...updatePartialTemplateDto} as any,
      where: {
        id
      }
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.partialTemplate.delete({
      where: {
        id
      }
    });
    return { message: 'Eliminado con éxito' };
  }
}
