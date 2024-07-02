import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';

@Controller('partial-templates')
export class PartialTemplatesController {

  // Injects the PartialTemplatesService into the controller
  constructor(private readonly partialTemplatesService: PartialTemplatesService) {}

  // Creates a new partial template
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

  // Uses JWT authentication guard to protect the route
  @UseGuards(JwtAuthGuard)
   // Retrieves all partial templates
  @Get()
  findAll() {
    return this.partialTemplatesService.findAll();
  }

  // Uses JWT authentication guard to protect the route
  @UseGuards(JwtAuthGuard)
   // Retrieves a specific partial template by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partialTemplatesService.findOne(id);
  }

  // Updates a specific partial template by ID
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePartialTemplateDto: UpdatePartialTemplateDto) {
    return this.partialTemplatesService.update(id, updatePartialTemplateDto);
  }

  // Uses JWT authentication guard to protect the route
  @UseGuards(JwtAuthGuard)
  // Deletes a specific partial template by ID
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.partialTemplatesService.remove(id);
  }
}
