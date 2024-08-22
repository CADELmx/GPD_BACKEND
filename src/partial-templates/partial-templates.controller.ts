import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';
import { customIdPipe } from 'src/common/validation/custom-validation.pipe';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PartialTemplateEntity } from './partialTemplate-entity';

@ApiBearerAuth()
@ApiTags('Plantilla Parcial')
@Controller('partial-templates')
export class PartialTemplatesController {
  constructor(
    private readonly partialTemplatesService: PartialTemplatesService,
  ) {}

  /**
   * Creates a new partialTemplate
   * @param {CreatePartialTemplateDto} createPartialTemplateDto The partialTemplate data transfer object
   * @returns - The created partialTemplate
   */
  @ApiOperation({ summary: 'Registrar Plantilla Parcial'})
  @ApiCreatedResponse({ type: PartialTemplateEntity})
  @Post()
  create(@Body() createPartialTemplateDto: CreatePartialTemplateDto) {
    return this.partialTemplatesService.create({ ...createPartialTemplateDto });
  }

  @ApiOperation({ summary: 'Buscar Plantillas Parciales'})
  @Get()
  async findAll(@Query('status') status?: string){
    return this.partialTemplatesService.findAll(status);
  }

  @ApiOperation({ summary: 'Buscar una Plantilla Parcial'})
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number){
    return this.partialTemplatesService.findOne(id);
  }

  /**
   * Updates a partialTemplate by ID
   * @param {number} id - The ID of the partialTemplate to update
   * @param {UpdatePartialTemplateDto} updatePartialTemplateDto - The updated partialTemplate data traansfer object
   * @returns - The updated partialTemplate
   */
  @ApiOperation({ summary: 'Actualizar Plantilla Parcial'})
  @ApiCreatedResponse({ type: PartialTemplateEntity})
  @Patch(':id')
  update(
    @Param('id', customIdPipe) id: number,
    @Body() updatePartialTemplateDto: UpdatePartialTemplateDto,
  ) {
    return this.partialTemplatesService.update(id, updatePartialTemplateDto);
  }

  /** Deletes a partialTemplate by ID
   * @param {number} id - The ID of the partialTemplate to delete
   * @returns - The deleted partialTemplate
   */
  @ApiOperation({ summary: 'Eliminar Plantilla Parcial'})
  @ApiCreatedResponse({ type: PartialTemplateEntity})
  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.partialTemplatesService.remove(id);
  }
}
