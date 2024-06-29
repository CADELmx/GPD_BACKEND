import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { CreatePartialTemplateDto } from 'src/models/partialTemplate/create-partial-template.dto';
import { UpdatePartialTemplateDto } from 'src/models/partialTemplate/update-partial-template.dto';
import { JwtAuthGuard } from 'src/auth/strategies/guards/jwt-auth.guard';

@Controller('partial-templates')
export class PartialTemplatesController {
  constructor(private readonly partialTemplatesService: PartialTemplatesService) {}

  create(createPartialTemplateDto: CreatePartialTemplateDto) {
    return 'This action adds a new partial';
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.partialTemplatesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.partialTemplatesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartialTemplateDto: UpdatePartialTemplateDto) {
    return this.partialTemplatesService.update(+id, updatePartialTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partialTemplatesService.remove(+id);
  }
}
