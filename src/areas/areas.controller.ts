import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from 'src/models/area/create-area.dto';
import { UpdateAreaDto } from 'src/models/area/update-area.dto';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Get()
  async find(
    @Query(
      'id',
      new ParseIntPipe({
        optional: true,
        exceptionFactory: () => {
          return new BadRequestException('El id debe ser un número');
        },
      }),
    )
    id?: number,
    @Query('name') name?: string,
  ) {
    if (id) return this.areasService.findOneById(id);
    if (name) return this.areasService.findOneByName(name);
    return this.areasService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.areasService.remove(id);
  }
}
