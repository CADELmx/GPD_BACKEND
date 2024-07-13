import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PartialTemplate } from '@prisma/client';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PartialTemplatesService {

  // Injects PrismaService into the service
  constructor(private readonly prisma: PrismaService){};


    /**
   * Rregisters a new PartialTemplate
   * @param {CreatePartialTemplateDto} createPartialTemplateDto - The partialTemplate data to register
   * @returns {Promise<PartialTemplate>} - The registered partialTemplate
   */
    async create(createPartialTemplateDto: CreatePartialTemplateDto): Promise <{ message: string | null; error: { message: string } | null; data: PartialTemplate | null }> {
      try {
      await this.validateForeignKeys(createPartialTemplateDto);
      this.validateTotalByPosition(createPartialTemplateDto);
      const newPartialTemplate = await this.prisma.partialTemplate.create({
        data: {
          ...createPartialTemplateDto,
        },
      });
  
      return { message: 'Listo, enviado', error: null, data: newPartialTemplate};
    } catch (error) {
      return { message: 'Error al enviar', error: error.message , data: null };
    }
 }

  /**
   * Lists all partialTemplates
   * @returns {Promise<PartialTemplate[]>} - All registered partialTemplates, by status
   */
  async findAll(): Promise <{name: string, totalHours: number, status: string }[]> {
    const partialTemplates = await this.prisma.partialTemplate.findMany({
      select: {
        name: true,
        total: true,
        status: true,
      },
  });
  return partialTemplates.map(template => ({
    name: template.name,
    totalHours: template.total,
    status: template.status,
  }));
 }

   /**
   * Gets a partialTemplate by its ID
   * @param {number} partialTemplateId - partialTemplate ID to search for
   * @returns {Promise<PartialTemplate>} -  The partialTemplate based on the given ID
   */
  async findOne(partialTemplateId: number): Promise<PartialTemplate>{
    const partialTemplate = await this.prisma.partialTemplate.findUnique({
      where: {
        id: partialTemplateId
      },
    });
    if(!partialTemplate){
      throw new NotFoundException('Partial template not found');
    }
    return partialTemplate;
  }

    /**
   * Updates a partialTemplate by its ID
   * @param {number} id - ID of partialTemplate to update
   * @param {UpdatePartialTemplateDto} updatePartialTemplateDto - partialTemplate data to update
   * @returns {Promise<PartialTemplate>} - The updated partialTemplate
   */
  async update(id: number, updatePartialTemplateDto: UpdatePartialTemplateDto): Promise< {message: string; data:PartialTemplate}> {
    await this.validateId(id);
    await this.validateForeignKeys(updatePartialTemplateDto);
    this.validateTotalByPosition(updatePartialTemplateDto);

    const updatePartialTemplate = await this.prisma.partialTemplate.update({
      data: { ...updatePartialTemplateDto} as any,
      where: {
        id
      }
    });
    return { message: 'Plantilla parcial actualizada', data: updatePartialTemplate};
  }

  /**
   * Deletes a partialTemplate by its ID
   * @param {number} id - ID of the partialTemplate to delete
   * @returns {Promise<PartialTemplate>} - The deleted partialTemplate
   */
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.prisma.partialTemplate.delete({
      where: {
        id
      }
    });
    return { message: 'Eliminado con exito' };
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
  private async validateForeignKeys( dto: CreatePartialTemplateDto | UpdatePartialTemplateDto): Promise<void> {
    const { templateId } = dto;
    const validations = [];

    if (templateId !== undefined) {
      validations.push(
        this.prisma.area.count({ where: { id: templateId } }).then((count) => {
          if (count === 0) {
            throw new NotFoundException(`Plantilla con id ${templateId} no encontrada`);
          }
        }),
      );
    }
    await Promise.all(validations);
  }

  /**
   * Restrict total hours by position 
   * @param {CreatePartialTemplateDto | UpdatePartialTemplateDto} dto - Data to validate
   * @throws {BadRequestException} - If the total do not match
   */
  private validateTotalByPosition(dto: CreatePartialTemplateDto | UpdatePartialTemplateDto): void {
    const { position, total } = dto;

    if(position === 'Profesor de asignatura'){
      if(total < 17 || total > 32 ){
        throw new BadRequestException('Cantidad de horas no permitida');
      }
    } else if (position === 'Profesor de Tiempo Completo'){
      if (total !== 40){
        throw new BadRequestException ('Cantidad de horas no permitida');
      }
    }
  }

}
