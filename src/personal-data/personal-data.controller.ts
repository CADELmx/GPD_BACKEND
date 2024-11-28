import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PersonalDataService } from './personal-data.service';
import { CreatePersonalDataDto } from 'src/models/personalData/create-personal-data.dto';
import {
  customBoolPipe,
  customIdPipe,
} from 'src/common/validation/custom-validation.pipe';
import { Public } from '../auth/decorators/public.decorator';

@Controller('personal-data')
export class PersonalDataController {
  constructor(private readonly personalDataService: PersonalDataService) { }
  /**
   * Handles the creation of a new personal data through post request.
   * @param createPersonalDataDto the data transfer object for creating a new personal data
   * @returns the created personal data
   */
  @Post()
  create(@Body() createPersonalDataDto: CreatePersonalDataDto) {
    return this.personalDataService.create(createPersonalDataDto);
  }
  /**
   * Creates multiple new personal data through post request.
   * @param createPersonalDataDto The list of data transfer objects
   * @returns the number of created personal data
   */
  @Post('many')
  createMany(@Body() createPersonalDataDto: CreatePersonalDataDto[]) {
    return this.personalDataService.createMany(createPersonalDataDto);
  }
  /**
   * Retrieves a personal data by ID or all personal data if no query parameters are provided.
   * @param id The id of the personal data to retrieve
   * @param active The active status of the personal data to retrieve
   * @returns returns the found personal data
   */
  @Public()
  @Get()
  find(
    @Query('id', customIdPipe) id?: number,
    @Query('active', customBoolPipe) active?: boolean,
  ) {
    if (id) return this.personalDataService.findOne(id);
    return this.personalDataService.findAll(active);
  }
  /**
   * Retrieves all personal data by position or area if provided, otherwise retrives all personal data.
   * @param position The position of the personal data to retrieve
   * @param area The area of the personal data to retrieve
   * @returns The found personal data
   */
  @Public()
  @Get('insensitive')
  findInsensitive(
    @Query('position') position?: string,
    @Query('area') area?: string,
  ) {
    return this.personalDataService.filterByFieldInsensitive(
      position,
      area,
    );
  }
  /**
   * Updates a personal data by ID through put request.
   * @param id The id of the personal data to update, provided in the URL
   * @param createPersonalDataDto The new data to update the personal data with
   * @returns The updated personal data
   */
  @Put(':id')
  update(
    @Param('id', customIdPipe) id: number,
    @Body() createPersonalDataDto: CreatePersonalDataDto,
  ) {
    return this.personalDataService.update(id, createPersonalDataDto);
  }
  /**
   * Deletes a personal data by ID.
   * @param id The id of the personal data to delete, provided in the URL
   * @returns The deleted personal data
   */
  @Delete(':id')
  delete(@Param('id', customIdPipe) id: number) {
    return this.personalDataService.delete(id);
  }
}
