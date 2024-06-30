import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { EducationalProgramsService } from './educational-programs.service';
import { CreateEducationalProgramDto } from '../models/EducationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/EducationalPrograms/update-educational-program.dto';

/**
 * Program root path
 * *http://localhost:3000/educational-programs
 */
@Controller('educational-programs')
export class EducationalProgramsController {
  constructor(private readonly educationalProgramsService: EducationalProgramsService) {}

  /**
   * Create a new program
   * @param createEducationalProgramDto Program data to create
   * @returns Return the created program
   */
  @Post()
  create(@Body() createEducationalProgramDto: CreateEducationalProgramDto) {
    return this.educationalProgramsService.createProg({ ...createEducationalProgramDto});
  }

  /**
   * Get all programs
   * @returns Return the programs
 */
  @Get()
  findAll() {
    return this.educationalProgramsService.findAll();
  }

  /**
   * Get a program using its id
   * @param id id of the program to obtain
   * @returns Returns the found program
 */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.educationalProgramsService.byId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEducationalProgramDto: UpdateEducationalProgramDto) {
    return this.educationalProgramsService.update(+id, updateEducationalProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationalProgramsService.remove(+id);
  }
}
