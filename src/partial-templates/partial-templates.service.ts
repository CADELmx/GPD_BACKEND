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
    async create(createPartialTemplateDto: CreatePartialTemplateDto): Promise <{ message: string; data: PartialTemplate}> {
      try {
      const newPartialTemplate = await this.prisma.partialTemplate.create({
        data: {
          ...createPartialTemplateDto,
        },
      });
  
      return { message: 'Listo enviado', data: newPartialTemplate};
    } catch (error) {
      console.error('Error al enviar', error);
      throw new InternalServerErrorException ('Error al enviar')
    }
    }

  /**
   * Lists all partialTemplates
   * @returns {Promise<PartialTemplate[]>} - All registered partialTemplates
   */
  async findAll(): Promise <PartialTemplate[]> {
    return this.prisma.partialTemplate.findMany();
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
    // Throws an exception if the partial template is not found
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
  async update(id: number, updatePartialTemplateDto: UpdatePartialTemplateDto): Promise<PartialTemplate> {
    // Ensures the partial template exists before updating
    await this.findOne(id);
    return this.prisma.partialTemplate.update({
      data: { ...updatePartialTemplateDto} as any,
      where: {
        id
      }
    });
  }

  /**
   * Deletes a partialTemplate by its ID
   * @param {number} id - ID of the partialTemplate to delete
   * @returns {Promise<PartialTemplate>} - The deleted partialTemplate
   */
  async remove(id: number): Promise<{ message: string }> {
    // Ensures the partial template exists before deleting
    await this.findOne(id);
    await this.prisma.partialTemplate.delete({
      where: {
        id
      }
    });
    return { message: 'Deleted successfully' };
  }
}
