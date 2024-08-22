import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from 'src/models/template/create-template.dto';
import { UpdateTemplateDto } from 'src/models/template/update-template.dto';
import { customIdPipe } from 'src/common/validation/custom-validation.pipe';
import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Plantillas')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  /**
   * Creates a new template
   * @param {CreateTemplateDto} createTemplateDto The template data transfer object
   * @returns - The created template
   */
  @ApiOperation({ summary: 'Registrar una nueva plantilla' })
  @ApiResponse({ status: 201, description: 'Plantilla registrada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 500, description: 'Error al crear la plantilla' })
  @ApiBody({
    description: 'Datos de la planitlla a registrar',
    type: CreateTemplateDto,
  })
  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create({ ...createTemplateDto });
  }

  /**
   * Retrieves all templates
   * @returns . An array of all templates
   */
  @ApiOperation({ summary: 'Obtener todas las plantillas' })
  @ApiResponse({ status: 200, description: 'Plantillas encontradas' })
  @ApiResponse({ status: 404, description: 'No se encontraron plantillas' })
  @ApiResponse({
    status: 500,
    description: 'Error al consultar las plantillas',
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'Id de la plantilla a buscar',
    type: 'number',
  })
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
  @ApiOperation({ summary: 'Actualizar una plantilla' })
  @ApiResponse({ status: 200, description: 'Plantilla actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Plantilla no encontrada' })
  @ApiResponse({ status: 500, description: 'Error al actualizar la plantilla' })
  @ApiParam({
    name: 'id',
    description: ' Id de la plantilla a actualizar',
    type: 'number',
  })
  @ApiBody({
    description: 'Datos de la plantilla a actualizar',
    type: UpdateTemplateDto,
  })
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
  @ApiOperation({ summary: 'Eliminar una plantilla' })
  @ApiResponse({ status: 200, description: 'Plantilla eliminada' })
  @ApiResponse({ status: 404, description: 'Plantilla no encontrada' })
  @ApiResponse({ status: 500, description: 'Error al eliminar' })
  @ApiParam({
    name: 'id',
    description: ' Id de la plantilla a eliminar',
    type: 'number',
  })
  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.templatesService.remove(id);
  }
}
