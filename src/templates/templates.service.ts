import { Prisma, Template } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTemplate: Prisma.TemplateCreateInput): Promise<Template> {
    return await this.prisma.template.create({
      data: createTemplate,
    });
  }

  async findAll(): Promise<Template[]> {
    return await this.prisma.template.findMany();
  }

  async validateId(id: number): Promise<Template> {
    const template = await this.prisma.template.findUnique({
      where: {
        id,
      },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }

  async findOne(id: number): Promise<Template> {
    await this.validateId(id);

    const template = await this.prisma.template.findUnique({
      where: {
        id,
      },
    });

    if (!template) {
      throw new NotFoundException(`Template witd ID #${id} not found`);
    }
    return template;
  }

  async update(id: number, updateTemplateDto: Prisma.TemplateUpdateInput) {
    await this.validateId(id);

    return await this.prisma.template.update({
      where: {
        id,
      },
      data: { ...updateTemplateDto },
    });
  }

  async remove(id: number) {
    await this.validateId(id);
    return await this.prisma.template.delete({
      where: {
        id,
      },
    });
  }
}
