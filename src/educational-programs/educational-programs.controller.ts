import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { EducationalProgramsService } from './educational-programs.service';
import { CreateEducationalProgramDto, CreateEducationalProgramsDto } from '../models/educationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/educationalPrograms/update-educational-program.dto';
import { customIdPipe } from '../common/validation/custom-validation.pipe';
import { Public } from '../auth/decorators/public.decorator';


@Controller('educational-programs')
export class EducationalProgramsController {
  constructor(
    private readonly educationalProgramsService: EducationalProgramsService,
  ) { }

  /**
   * Create a new program
   * @param createEducationalProgramDto Program data to create
   * @returns Return the created program
   */
  @Post()
  create(@Body() createEducationalProgramDto: CreateEducationalProgramDto) {
    return this.educationalProgramsService.createProgram(createEducationalProgramDto);
  }
  @Post('many')
  createMany(
    @Query('id', customIdPipe) id: number,
    @Body() createPrograms: CreateEducationalProgramsDto[]
  ) {
    return this.educationalProgramsService.createManyPrograms(id, createPrograms)
  }
  /**
   * This method is used to find a program by its id or all programs if no query parameters are provided
   * @param id query parameter to find a program by its id
   * @returns
   */
  @Public()
  @Get()
  find(@Query('id', customIdPipe) id?: number) {
    if (id) return this.educationalProgramsService.findProgramById(id);
    return this.educationalProgramsService.findAllPrograms();
  }
  @Public()
  @Get('/area')
  findByArea(@Query('id', customIdPipe) id: number) {
    return this.educationalProgramsService.findByArea(id);
  }

  /**
   * Update a program using its id
   * @param id id of the program to update
   * @param updateEducationalProgramDto Program data to update
   * @returns Returns the updated program
   */
  @Put(':id')
  update(
    @Param('id', customIdPipe) id: number,
    @Body() updateEducationalProgramDto: UpdateEducationalProgramDto,
  ) {
    return this.educationalProgramsService.updateProgram(
      id,
      updateEducationalProgramDto,
    );
  }

  /**
   * Method to delete a program
   * @param id id of the program to delete
   * @param body Wait for confirmation from the user
   * @returns Return a message after deleting a program
   */
  @Delete(':id')
  async remove(
    @Param('id', customIdPipe) id: number,
  ) {
    const result = await this.educationalProgramsService.removeProgram(
      id
    );
    return result;
  }
}
