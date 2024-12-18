import { Template } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { CreateTemplateDto } from '../models/template/create-template.dto';
import { UpdateTemplateDto } from '../models/template/update-template.dto';
import { APIResult } from 'src/common/api-results-interface';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) { }

  /**
   * Registers a new template.
   * @param {CreateTemplateDto} createTemplateDto - The template data to register.
   * @returns {Promise<{ message: string; error: string | null; data: Template | null }>} - The registered template.
   */
  async create(createTemplateDto: CreateTemplateDto): Promise<APIResult<Template>> {
    try {
      await this.validateAreaId(createTemplateDto);
      await this.validateResponsibleId(createTemplateDto);
      await this.validateRevisedById(createTemplateDto);

      const template = await this.prisma.template.create({
        data: createTemplateDto,
      });
      return {
        message: 'Plantilla registrada',
        error: null,
        data: template,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear la plantilla',
      );
    }
  }

  /**
   * Lists all templates.
   * @returns {Promise<{ message: string; error: string | null; data: Template[] | null }>} - All registered templates.
   * Lists all templates.
   * @returns {Promise<{ message: string; error: string | null; data: Template[] | null }>} - All registered templates.
   */
  async findAll(): Promise<APIResult<Template[]>> {
    // return await this.prisma.personalData.findMany();
    try {
      const templates = await this.prisma.template.findMany();
      if (templates.length === 0) return {
        message: 'No se encontraron plantillas',
        error: null,
        data: [],
      }
      return {
        message: 'Plantillas obtenidas con exito',
        error: null,
        data: templates,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar las plantillas',
      );
    }
  }

  /**
   * Gets a template by its ID.
   * @param {number} id - The ID of the template to search for.
   * @returns {Promise<{ message: string; error: string | null; data: Template | null }>} - The template based on the given ID.
   */
  async findOne(id: number): Promise<APIResult<Template>> {
    try {
      if (id) {
        const template = await this.prisma.template.findUnique({
          where: {
            id,
          },
        });

        if (!template) return {
          message: 'Plantilla inexistente',
          error: null,
          data: template,
        };
        return {
          message: 'Plantilla obtenidas con éxito',
          error: null,
          data: template,
        };
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar la plantilla',
      );
    }
  }
  async findByArea(id: number): Promise<APIResult<Template[]>> {
    try {
      if (!id) {
        return {
          message: 'El id del area es requerido',
          error: null,
          data: null,
        }
      }
      await this.validateAreaId({ areaId: id });
      const templates = await this.prisma.template.findMany({
        where: {
          areaId: id
        }
      });
      if (templates.length === 0) return {
        message: 'No se encontraron plantillas para este area',
        error: null,
        data: [],
      }
      return {
        message: 'Plantillas obtenidas con exito',
        error: null,
        data: templates
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar la plantilla',
      )
    }
  }
  async findJoinPartialTemplates(): Promise<APIResult<Template[]>> {
    try {
      const partialTemplates = await this.prisma.template.findMany({
        include: {
          partialTemplate: true
        }
      })
      if (partialTemplates.length === 0) return {
        error: null,
        message: 'No se encontraron plantillas',
        data: []
      }
      return {
        data: partialTemplates,
        message: 'Plantillas encontradas',
        error: null
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al consultar las plantillas'
      )
    }
  }
  /**
   * Updates a template by its ID.
   * @param {number} id - The ID of the template to update.
   * @param {UpdateTemplateDto} updateTemplateDto - The template data to update.
   * @returns {Promise<{ message: string; error: string | null; data: Template | null }>} - The updated template.
   */
  async update(id: number, updateTemplateDto: UpdateTemplateDto): Promise<APIResult<Template>> {
    try {
      await this.validateId(id);
      await this.validateAreaId(updateTemplateDto);
      await this.validateResponsibleId(updateTemplateDto);
      await this.validateRevisedById(updateTemplateDto);

      const template = await this.validateId(id);
      const currentPeriods = [
        TemplatesService.currentPeriod(true),
        TemplatesService.currentPeriod(false),
      ];

      if (!currentPeriods.includes(template.period)) {
        return {
          message: null,
          error: 'Esta plantilla no se puede actualizar',
          data: null,
        };
      }

      const updatedTemplate = await this.prisma.template.update({
        where: {
          id,
        },
        data: updateTemplateDto,
      });

      return {
        message: 'Plantilla actualizada',
        error: null,
        data: updatedTemplate,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al actualizar la plantilla',
      );
    }
  }

  /**
   * Deletes a template by its ID.
   * @param {number} id - The ID of the template to delete.
   * @returns {Promise<{ message: string; error: string | null; data: null }>} - The result of the deletion.
   */
  async remove(id: number): Promise<APIResult<Template>> {
    try {
      await this.validateId(id);
      const deletedTemplate = await this.prisma.template.delete({
        where: {
          id,
        },
      });
      return {
        message: 'Se eliminó la plantilla',
        error: null,
        data: deletedTemplate,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al eliminar la plantilla',
      );
    }
  }

  /**
   * Gets the current period based on the current month and year.
   * @param {boolean} ord - Indicates whether the period is Ordinary (true) or Extraordinary (false).
   * @returns {string} - The period string for the current period.
   */
  private static currentPeriod(ord: boolean): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const ordinary = ord ? 'Ordinario' : 'Extraordinario';

    if (month <= 4) {
      return `enero - abril ${year}: ${ordinary}`;
    } else if (month <= 8) {
      return `mayo - agosto ${year}: ${ordinary}`;
    } else {
      return `septiembre - diciembre ${year}: ${ordinary}`;
    }
  }

  /**
   * Validates if a template ID exists.
   * @param {number} id - The ID of the template to validate.
   * @returns {Promise<Template>} - The template with the given ID.
   * @throws {NotFoundException} - If the template ID is not found.
   */
  private async validateId(id: number): Promise<Template> {
    const template = await this.prisma.template.findUnique({
      where: {
        id,
      },
    });

    if (!template) {
      throw new NotFoundException('Plantilla no encontrada');
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
