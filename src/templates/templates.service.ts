import { Template } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from 'src/models/template/create-template.dto';
import { UpdateTemplateDto } from 'src/models/template/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Rregisters a new template
   * @param {CreateTemplateDto} createTemplate - The template data to register
   * @returns {Promise<Template>} - The registered template
   */
  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    return await this.prisma.template.create({
      data: {
        ...createTemplateDto,
      },
    });
  }

  /**
   * Lists all templates
   * @returns {Promise<Template[]>} - All registered templates
   */
  async findAll(): Promise<Template[]> {
    return await this.prisma.template.findMany();
  }

  /**
   * Validates if template ID exists
   * @param {number} id - Template ID to validate
   * @returns {Promise<Template>} - The template with the given ID
   * @throws {NotFoundException} - If the template ID is not found
   */
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

  /**
   * Gets a template by its ID
   * @param {number} id - Template ID to search for
   * @returns {Promise<Template>} -  The template based on the given ID
   */
  async findOne(id: number): Promise<Template> {
    await this.validateId(id);
    return await this.prisma.template.findUnique({
      where: {
        id,
      },
    });
  }

  /**
   * Updates a template by its ID
   * @param {number} id - ID of template to update
   * @param {UpdateTemplateDto} updateTemplate - Template data to update
   * @returns {Promise<Template>} - The updated template
   */
  async update(
    id: number,
    updateTemplate: UpdateTemplateDto,
  ): Promise<Template> {
    await this.validateId(id);

    return await this.prisma.template.update({
      where: {
        id,
      },
      data: { ...updateTemplate },
    });
  }

  /**
   * Deletes a template by its ID
   * @param {number} id - ID of the template to delete
   * @returns {Promise<Template>} - The deleted template
   */
  async remove(id: number): Promise<Template> {
    await this.validateId(id);
    return await this.prisma.template.delete({
      where: {
        id,
      },
    });
  }
}
