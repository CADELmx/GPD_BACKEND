import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PartialTemplate } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { CreatePartialTemplateDto } from '../models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from '../models/partialTemplate/update-partial-template.dto';


@Injectable()
export class PartialTemplatesService {
  // Injects PrismaService into the service
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaErrorHandler: PrismaErrorHandler,
  ) { }

  /**
   * Rregisters a new PartialTemplate
   * @param {CreatePartialTemplateDto} createPartialTemplateDto - The partialTemplate data to register
   * @returns {Promise<PartialTemplate>} - The registered partialTemplate
   */
  async create(createPartialTemplateDto: CreatePartialTemplateDto): Promise<{
    message: string | null;
    error: string | null;
    data: PartialTemplate | null;
  }> {
    try {
      await this.validateIfExistsTemplateId(createPartialTemplateDto);
      await this.validateTotalByPosition(createPartialTemplateDto);
      const newPartialTemplate = await this.prisma.partialTemplate.create({
        data: createPartialTemplateDto,
      });

      return {
        message: 'Listo, enviado',
        error: null,
        data: newPartialTemplate,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al crear la plantilla parcial',
      );
    }
  }

  /**
   * Lists partialTemplates filtered by status
   * @param {string} [status] - Status to filter partial templates by. Allowed values
   * @returns {Promise<{name: string, totalHours: number, status: string}[]>} - All registered partialTemplates
   */
  async findAll(status?: string): Promise<{
    message: string;
    error: string | null;
    data: { name: string; total: number; status: string }[] | null;
  }> {
    try {
      const allowedStatuses = ['pendiente', 'aprobado', 'corrección'];
      const filter: any = {};

      if (status && allowedStatuses.includes(status)) {
        filter.status = status;
      }

      const partialTemplates = await this.prisma.partialTemplate.findMany({
        where: filter,
        select: {
          name: true,
          total: true,
          status: true,
        },
      });

      if (partialTemplates.length === 0) return {
        message: 'No hay plantillas parciales para mostrar',
        error: null,
        data: [],
      }
      return {
        message: 'Plantillas Parciales obtenidas con exito',
        error: null,
        data: partialTemplates,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al obtener las plantillas parciales',
      );
    }
  }

  /**
   * Gets a partial template by its ID.
   * @param {number} id - The ID of the partial template to search for.
   * @returns {Promise<{ message: string; error: string | null; data: Template | null }>} - The partial template based on the given ID.
   */
  async findOne(id: number): Promise<any> {
    try {
      if (id) {
        await this.validateId(id);
        const partailTemplate = await this.prisma.partialTemplate.findMany({
          where: {
            id,
          },
        });
        return {
          message: 'Plantilla parcial obtenida con éxito',
          error: null,
          data: partailTemplate,
        };
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al obtener la plantilla parcial',
      );
    }
  }
  /**
   * Retrieves a single partial template with all its activities
   * @param {number} id Id of the partial template
   * @returns Partial template with all its activities
   */
  async findOneJoin(id: number) {
    await this.validateId(id)
    try {
      const partialTemplateAct = await this.prisma.partialTemplate.findUnique({
        where: { id },
        include: {
          activities: {
            select: {
              id: true,
              activityDistribution: true,
              activityName: true,
              educationalProgramId: true,
              gradeGroups: true,
              managmentType: true,
              numberStudents: true,
              stayType: true,
              subtotalClassification: true,
              weeklyHours: true
            }
          }
        }
      })
      return {
        message: 'Plantilla parcial obtenida de forma exitosa',
        error: null,
        data: partialTemplateAct
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al obtener plantilla parcial'
      )
    }
  }

  async findAllJoin(status?: string) {
    try {
      const allowedStatuses = ['pendiente', 'aprobado', 'corrección'];
      const filter: any = {};

      if (status && allowedStatuses.includes(status)) {
        filter.status = status;
      }

      const partialTemplatesJoin = await this.prisma.partialTemplate.findMany({
        where: filter,
        include: {
          activities: {
            select: {
              id: true,
              activityDistribution: true,
              activityName: true,
              educationalProgramId: true,
              gradeGroups: true,
              managmentType: true,
              numberStudents: true,
              stayType: true,
              subtotalClassification: true,
              weeklyHours: true
            }
          }
        }
      })
      if (partialTemplatesJoin.length === 0) return {
        message: 'No hay plantillas parciales para mostrar',
        error: null,
        data: null
      }
      return {
        message: 'Plantillas parciales obtenidas con éxito',
        error: null,
        data: partialTemplatesJoin
      }
    } catch (error) {
      return this.prismaErrorHandler.handleError(error, 'Error al obtener las plantillas parciales')
    }
  }

  /**
   * Updates a partialTemplate by its ID
   * @param {number} id - ID of partialTemplate to update
   * @param {UpdatePartialTemplateDto} updatePartialTemplateDto - partialTemplate data to update
   * @returns {Promise<PartialTemplate>} - The updated partialTemplate
   */
  async update(
    id: number,
    updatePartialTemplateDto: UpdatePartialTemplateDto,
  ): Promise<any> {
    try {
      await this.validateId(id);
      await this.validateIfExistsTemplateId(updatePartialTemplateDto);
      await this.validateTotalByPosition(updatePartialTemplateDto);

      const updatePartialTemplate = await this.prisma.partialTemplate.update({
        data: { ...updatePartialTemplateDto } as any,
        where: {
          id,
        },
      });
      return {
        message: 'Plantilla parcial actualizada',
        errror: null,
        data: updatePartialTemplate,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al actualizar la plantilla parcial',
      );
    }
  }

  /**
   * Deletes a partialTemplate by its ID
   * @param {number} id - ID of the partialTemplate to delete
   * @returns {Promise<PartialTemplate>} - The deleted partialTemplate
   */
  async remove(id: number): Promise<any> {
    try {
      await this.findOne(id);
      await this.prisma.partialTemplate.delete({
        where: {
          id,
        },
      });
      return {
        message: 'Plantilla parcial eliminada con exito',
        error: null,
        data: null,
      };
    } catch (error) {
      return this.prismaErrorHandler.handleError(
        error,
        'Error al eliminar la plantilla parcial',
      );
    }
  }

  /**
   * Validates if partailTemplate ID exists
   * @param {number} id - partailTemplate ID to validate
   * @returns {Promise<Template>} - The partailTemplate with the given ID
   * @throws {NotFoundException} - If the partailTemplate ID is not found
   */
  async validateId(id: number): Promise<PartialTemplate> {
    const partialTemplate = await this.prisma.partialTemplate.findUnique({
      where: {
        id,
      },
    });

    if (!partialTemplate) {
      throw new NotFoundException('Plantilla Parcial no encontrada');
    }
    return partialTemplate;
  }

  /**
   * Validates if foreign keys (templateId)
   * @param {CreatePartialTemplateDto | UpdatePartialTemplateDto} dto - Data to validate
   * @throws {NotFoundException} - If any foreign keys is not found
   */
  private async validateIfExistsTemplateId(
    dto: CreatePartialTemplateDto | UpdatePartialTemplateDto,
  ): Promise<void> {
    const { templateId } = dto;

    if (templateId !== undefined) {
      const template = await this.prisma.template.findUnique({
        where: { id: templateId },
      });
      if (!template) {
        throw new NotFoundException(
          `Plantilla con id ${templateId} no encontrada`,
        );
      }
    }
  }

  /**
   * Restrict total hours by position
   * @param {CreatePartialTemplateDto | UpdatePartialTemplateDto} dto - Data to validate
   * @throws {BadRequestException} - If the total do not match
   */
  private validateTotalByPosition(
    dto: CreatePartialTemplateDto | UpdatePartialTemplateDto,
  ): void {
    const { position, total } = dto;
    const lowerCasePosition = position.toLowerCase();

    if (lowerCasePosition.includes('de asignatura')) {
      if (total < 17 || total > 32) {
        throw new BadRequestException('Cantidad de horas no permitida');
      }
    } else if (lowerCasePosition.includes('tiempo completo')) {
      if (total !== 40) {
        throw new BadRequestException('Cantidad de horas no permitida');
      }
    }
  }
}
