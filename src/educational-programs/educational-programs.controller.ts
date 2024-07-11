import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { EducationalProgramsService } from './educational-programs.service';
import { CreateEducationalProgramDto } from '../models/EducationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/EducationalPrograms/update-educational-program.dto';
import { LocalAuthGuard } from 'src/auth/strategies/guards/local-auth.guard';

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
    return this.educationalProgramsService.create({ ...createEducationalProgramDto});
  }

  /**
   * Get all programs
   * @returns Return the programs
 */
  @UseGuards(LocalAuthGuard)
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

  /**
   * Update a program using its id
   * @param id id of the program to update
   * @param updateEducationalProgramDto Program data to update
   * @returns Returns the updated program
   */

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEducationalProgramDto: UpdateEducationalProgramDto) {
    return this.educationalProgramsService.update(id, updateEducationalProgramDto);
  }

 /**
  * Method to delete a program
  * @param id id of the program to delete
  * @returns Return a message after deleting a program
  */
 @Delete(':id')
 async remove(
   @Param('id') id: string,
   @Body() body: { Confirmado: string }
 ) {
   const idNumber = parseInt(id, 10);

   if (isNaN(idNumber)) {
     throw new BadRequestException('Formato de ID no válido');
   }

   // Convert confirmed to a boolean
   const isConfirmed = body.Confirmado === 'true';

   if (!isConfirmed) {
     return { message: 'Operación no confirmada por el usuario' };
   }

   const result = await this.educationalProgramsService.remove(idNumber, isConfirmed);
   
   return result;
 }
  
}
