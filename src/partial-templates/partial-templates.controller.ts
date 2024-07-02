import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';

@Controller('partial-templates')
export class PartialTemplatesController {

  constructor(private readonly partialTemplatesService: PartialTemplatesService) {}

  
  /**
  * Creates a new partialTemplate
  * @param {CreatePartialTemplateDto} createPartialTemplateDto The partialTemplate data transfer object
  * @returns - The created partialTemplate
  */
  @Post()
  create(@Body() createPartialTemplateDto: CreatePartialTemplateDto) {
    return this.partialTemplatesService.create({
      nt: createPartialTemplateDto.nt,
      name: createPartialTemplateDto.name,
      gender: createPartialTemplateDto.gender,
      position: createPartialTemplateDto.position,
      status: createPartialTemplateDto.status,
      total: createPartialTemplateDto.total,
      year: createPartialTemplateDto.year,
      period: createPartialTemplateDto.period,
      templateId: createPartialTemplateDto.templateId

    });
  }


  /**
   * Retrieves all partialTemplates
   * @returns . An array of all partialTemplates
  */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.partialTemplatesService.findAll();
  }

  
  /** Retrieves a partialTemplate by ID
  * @param {number} id - The ID of the partialTemplate to retrieve
  * @returns - The partialTemplate with the specified ID
  */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partialTemplatesService.findOne(id);
  }

  /**
   * Updates a partialTemplate by ID
   * @param {number} id - The ID of the partialTemplate to update
   * @param {UpdatePartialTemplateDto} updatePartialTemplateDto - The updated partialTemplate data traansfer object
   * @returns - The updated partialTemplate
   */
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePartialTemplateDto: UpdatePartialTemplateDto) {
    return this.partialTemplatesService.update(id, updatePartialTemplateDto);
  }

  
  /** Deletes a partialTemplate by ID
  * @param {number} id - The ID of the partialTemplate to delete
  * @returns - The deleted partialTemplate
  */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partialTemplatesService.remove(id);
  }
}
