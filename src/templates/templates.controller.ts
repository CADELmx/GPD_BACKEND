import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  Query,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from '../models/template/create-template.dto';
import { customIdPipe } from '../common/validation/custom-validation.pipe';
import { UpdateTemplateDto } from '../models/template/update-template.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}
  /**
   * Creates a new template
   * @param {CreateTemplateDto} createTemplateDto The template data transfer object
   * @returns - The created template
   */
  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  /**
   * Retrieves all templates
   * @returns . An array of all templates
   */
  @Get()
  find(@Query('id', customIdPipe) id?: number) {
    if (id) return this.templatesService.findOne(id);
    return this.templatesService.findAll();
  }
  /**
   * Updates a template by ID
   * @param {number} id - The ID of the template to update
   * @param {UpdateTemplateDto} updateTemplateDto - The updated template data traansfer object
   * @returns - The updated template
   */
  @Patch(':id')
  update(
    @Param('id', customIdPipe) id: number,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templatesService.update(id, updateTemplateDto);
  }

  /**
   * Deletes a template by ID
   * @param {number} id - The ID of the template to delete
   * @returns - The deleted template
   */
  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.templatesService.remove(id);
  }
}
