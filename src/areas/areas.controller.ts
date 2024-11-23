import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Controller,
  Put,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from '../models/area/create-area.dto';
import { customBoolPipe, customIdPipe } from '../common/validation/custom-validation.pipe';
import { UpdateAreaDto } from '../models/area/update-area.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) { }

  /**
   * Creates a new area.
   * @param createAreaDto - Data Transfer Object for creating a new area.
   * @returns The created area.
   */
  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }
  /**
   * Creates multiple new areas.
   * @param createAreaDto - Array of Data Transfer Objects for creating new areas.
   * @returns The number of created areas.
   */
  @Post('many')
  createMany(@Body() createAreaDto: CreateAreaDto[]) {
    return this.areasService.createMany(createAreaDto)
  }
  /**
   * Retrieves an area by ID or name, or all areas if no query parameters are provided.
   * @param id - The ID of the area to retrieve (optional).
   * @param name - The name of the area to retrieve (optional).
   * @returns The found area(s).
   */
  @Public()
  @Get()
  async find(
    @Query('id', customIdPipe) id?: number,
    @Query('name') name?: string,
  ) {
    if (id) return this.areasService.findOneById(id);
    if (name) return this.areasService.findOneByName(name);
    return this.areasService.findAll();
  }
  /**
   * Retrive all areas with their educational programs.
   * @returns The found areas with their educational programs.
   */
  @Public()
  @Get('educational-programs')
  async findWithJoin(
    @Query('count', customBoolPipe) count?: boolean,
  ) {
    if (count) return this.areasService.findAllEeducationalProgramsCount()
    return this.areasService.findAllJoinEducationalPrograms()
  }

  /**
   * Updates an area by its ID.
   * @param id - The ID of the area to update.
   * @param updateAreaDto - Data Transfer Object for updating an area.
   * @returns The updated area.
   */
  @Put(':id')
  update(
    @Param('id', customIdPipe) id: number,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(id, updateAreaDto);
  }

  /**
   * Deletes an area by its ID.
   * @param id - The ID of the area to delete.
   * @returns The deleted area.
   */
  @Delete(':id')
  remove(@Param('id', customIdPipe) id: number) {
    return this.areasService.remove(id);
  }
}
