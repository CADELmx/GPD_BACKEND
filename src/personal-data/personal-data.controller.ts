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
  @Post()
  create(@Body() createPersonalDataDto: CreatePersonalDataDto) {
    return this.personalDataService.create(createPersonalDataDto);
  }
  @Post('many')
  createMany(@Body() createPersonalDataDto: CreatePersonalDataDto[]) {
    return this.personalDataService.createMany(createPersonalDataDto);
  }
  @Public()
  @Get()
  find(
    @Query('id', customIdPipe) id?: number,
    @Query('active', customBoolPipe) active?: boolean,
  ) {
    if (id) return this.personalDataService.findOne(id);
    return this.personalDataService.findAll(active);
  }
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
  @Put(':id')
  update(
    @Param('id', customIdPipe) id: number,
    @Body() createPersonalDataDto: CreatePersonalDataDto,
  ) {
    return this.personalDataService.update(id, createPersonalDataDto);
  }
  @Delete(':id')
  delete(@Param('id', customIdPipe) id: number) {
    return this.personalDataService.delete(id);
  }
}
