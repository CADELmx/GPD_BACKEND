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
    await this.validateForeignKeys(createTemplateDto);

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
    updateTemplateDto: UpdateTemplateDto,
  ): Promise<Template> {
    await this.validateId(id);
    await this.validateForeignKeys(updateTemplateDto);

    const updateTemplate = await this.prisma.template.update({
      where: {
        id,
      },
      data: { ...updateTemplateDto },
    });
    return updateTemplate;
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
   * Validates if the area ID exists.
   * @param {CreateTemplateDto | UpdateTemplateDto} dto - The DTO containing the area ID.
   * @returns {Promise<void>} - Resolves if the area ID is valid.
   * @throws {NotFoundException} - If the area ID is not found.
   */
  private async validateAreaId(
    dto: CreateTemplateDto | UpdateTemplateDto,
  ): Promise<void> {
    const { areaId } = dto;
    if (areaId !== undefined) {
      const area = await this.prisma.area.findUnique({ where: { id: areaId } });
      if (!area) {
        throw new NotFoundException(`Área con ID ${areaId} no encontrada`);
      }
    }
  }

  /**
   * Validates if the responsible user ID exists.
   * @param {CreateTemplateDto | UpdateTemplateDto} dto - The DTO containing the responsible user ID.
   * @returns {Promise<void>} - Resolves if the responsible user ID is valid.
   * @throws {NotFoundException} - If the responsible user ID is not found.
   */
  private async validateResponsibleId(
    dto: CreateTemplateDto | UpdateTemplateDto,
  ): Promise<void> {
    const { responsibleId } = dto;
    if (responsibleId !== undefined) {
      const user = await this.prisma.users.findUnique({
        where: { nt: responsibleId },
      });
      if (!user) {
        throw new NotFoundException(
          `Usuario con NT ${responsibleId} no encontrado`,
        );
      }
    }
  }

  /**
   * Validates if the revised by user ID exists.
   * @param {CreateTemplateDto | UpdateTemplateDto} dto - The DTO containing the revised by user ID.
   * @returns {Promise<void>} - Resolves if the revised by user ID is valid.
   * @throws {NotFoundException} - If the revised by user ID is not found.
   */
  private async validateRevisedById(
    dto: CreateTemplateDto | UpdateTemplateDto,
  ): Promise<void> {
    const { revisedById } = dto;
    if (revisedById !== undefined) {
      const user = await this.prisma.users.findUnique({
        where: { nt: revisedById },
      });
      if (!user) {
        throw new NotFoundException(
          `Usuario con NT ${revisedById} no encontrado`,
        );
      }
    }
  }
}
