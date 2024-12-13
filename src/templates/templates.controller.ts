import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  Controller,
  Query,
  Put,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from '../models/template/create-template.dto';
import { customIdPipe } from '../common/validation/custom-validation.pipe';
import { UpdateTemplateDto } from '../models/template/update-template.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) { }
  /**
   * Creates a new template
   * @param {CreateTemplateDto} createTemplateDto The template data transfer object
   * @returns - The created template
   */
  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    console.log('createTemplateDto', createTemplateDto);
    return this.templatesService.create(createTemplateDto);
  }

  /**
   * Retrieves all templates or a single one by ID
   * @param {number} id - The ID of the template to retrieve
   * @returns An array of all templates or a single template
   */
  @Public()
  @Get()
  find(@Query('id', customIdPipe) id?: number) {
    if (id) return this.templatesService.findOne(id);
    return this.templatesService.findAll();
  }
  @Public()
  @Get('area')
  findByArea(@Query('id', customIdPipe) id: number) {
    return this.templatesService.findByArea(id);
  }
  @Public()
  @Get('partial-templates')
  findJoinPartialTemplates() {
    return this.templatesService.findJoinPartialTemplates()
  }
  /**
   * Updates a template by ID
   * @param {number} id - The ID of the template to update
   * @param {UpdateTemplateDto} updateTemplateDto - The updated template data traansfer object
   * @returns - The updated template
   */
  @Put(':id')
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
