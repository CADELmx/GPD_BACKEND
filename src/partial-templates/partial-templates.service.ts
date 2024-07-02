import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PartialTemplate } from '@prisma/client';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PartialTemplatesService {

  // Injects PrismaService into the service
  constructor(private readonly prisma: PrismaService){};
  // Creates a new partial template

  async create(createPartialTemplateDto: CreatePartialTemplateDto): Promise <PartialTemplate> {
    // Checks if a partial template with the same name already exists
    const existingPartialTemplate =  await this.prisma.partialTemplate.findFirst({
      where: {
        name: createPartialTemplateDto.name,
      },
    });
    // Throws an exception if a template with the same name exists
    if (existingPartialTemplate){
      throw new BadRequestException('A partial template with this name already exists');
    }

    // Creates a new partial template
    return this.prisma.partialTemplate.create({
      data: {
        ...createPartialTemplateDto,
      },
    });
  }

  // Retrieves all partial templates
  async findAll(): Promise <PartialTemplate[]> {
    return this.prisma.partialTemplate.findMany();
  }

  // Retrieves a specific partial template by ID
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

  // Updates a specific partial template by ID
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

  // Deletes a specific partial template by ID
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
