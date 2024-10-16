import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { CreatePartialTemplateDto } from '../models/partialTemplate/create-partial-template.dto';
import { customIdPipe } from '../common/validation/custom-validation.pipe';
import { UpdatePartialTemplateDto } from '../models/partialTemplate/update-partial-template.dto';


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
  @Post()
  create(@Body() createPartialTemplateDto: CreatePartialTemplateDto) {
    return this.partialTemplatesService.create(createPartialTemplateDto);
  }

  find(
    @Query('id', customIdPipe) id?: number,
    @Query('status') status?: string,
  ) {
    if (id) return this.partialTemplatesService.findOne(id);
    if (status) return this.partialTemplatesService.findAll(status);
    return this.partialTemplatesService.findAll();
  }

  /**
   * Updates a partialTemplate by ID
   * @param {number} id - The ID of the partialTemplate to update
   * @param {UpdatePartialTemplateDto} updatePartialTemplateDto - The updated partialTemplate data traansfer object
   * @returns - The updated partialTemplate
   */
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
  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.partialTemplatesService.remove(id);
  }
}
