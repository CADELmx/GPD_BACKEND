import { Injectable, NotFoundException } from '@nestjs/common';
import { PartialTemplate } from '@prisma/client';
import { promises } from 'dns';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PartialTemplatesService {
  constructor(private readonly prisma: PrismaService){};

  create(createPartialTemplateDto: CreatePartialTemplateDto): Promise <PartialTemplate> {
    return this.prisma.partialTemplate.create({
      data: {
        ...createPartialTemplateDto
      }
    })
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

  update(id: number, updatePartialTemplateDto: UpdatePartialTemplateDto) {
    return `This action updates a #${id} partialTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} partialTemplate`;
  }
}
