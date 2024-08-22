import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { EducationalProgramsService } from './educational-programs.service';
import { CreateEducationalProgramDto } from '../models/EducationalPrograms/create-educational-program.dto';
import { UpdateEducationalProgramDto } from '../models/EducationalPrograms/update-educational-program.dto';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EduProgramsEntity } from './edu_programs-entity';
import ObjectSerialization from '../common/validation/ObjectSerialization';
import { customIdPipe } from '../common/validation/custom-validation.pipe';


//@ApiBearerAuth()
@ApiTags('Programas Educativos')
@Controller('educational-programs')
export class EducationalProgramsController {
  constructor(
    private readonly educationalProgramsService: EducationalProgramsService,
  ) {}

  /**
   * Create a new program
   * @param createEducationalProgramDto Program data to create
   * @returns Return the created program
   */
  @ApiOperation({summary : 'Registar un programa educativo'})
  @ApiCreatedResponse({ type: EduProgramsEntity})
  @Post()
  async create(@Body() createEducationalProgramDto: CreateEducationalProgramDto) {
    return ObjectSerialization( await this.educationalProgramsService.createProgram({ ...createEducationalProgramDto }));
  }

  /**
   * This method is used to find a program by its id or all programs if no query parameters are provided
   * @param id query parameter to find a program by its id
   * @returns
   */
  
  /*@Get()
  find(@Query('id', customIdPipe) id?: bigint) {
    if (id) return this.educationalProgramsService.findProgramById(id);
    return this.educationalProgramsService.findAllPrograms();
  }*/
  @ApiOperation({summary : 'Mostrar un programa educativo'})
  @ApiCreatedResponse({ type: EduProgramsEntity})
  @Get(':id')
  async findById(@Param('id', customIdPipe) id: string) {
    const programId = BigInt(id);
    const foundProgram = await this.educationalProgramsService.findProgramById(programId);
    return ObjectSerialization(foundProgram);
  }

  /**
   * Update a program using its id
   * @param id id of the program to update
   * @param updateEducationalProgramDto Program data to update
   * @returns Returns the updated program
   */
  @ApiOperation({summary : 'Actualizar un programa educativo'})
  @ApiCreatedResponse({ type: EduProgramsEntity})
  @Patch(':id')
  async update(
    @Param('id', customIdPipe) id: string,
    @Body() updateEducationalProgramDto: UpdateEducationalProgramDto) {
      const programId = BigInt(id);
    return  ObjectSerialization( await this.educationalProgramsService.updateProgram(programId, updateEducationalProgramDto));
  }

  /**
   * Method to delete a program
   * @param id id of the program to delete
   * @param body Wait for confirmation from the user
   * @returns Return a message after deleting a program
   */
  @ApiOperation({summary : 'Eliminar un programa educativo'})
  @ApiCreatedResponse({ type: EduProgramsEntity})
  @ApiBody({ schema: { type: 'object', properties: { confirmado: { type: 'boolean' } } } })
  @Delete(':id')
  async remove(
    @Param('id', customIdPipe) id: string,
    @Body() body: { confirmado: boolean }
  ) {
    const programId = BigInt(id);
    if (!body.confirmado) {
      return { message: 'Operación no confirmada por el usuario' };
    }

    const result = await this.educationalProgramsService.removeProgram(programId, body.confirmado);

    return  ObjectSerialization( result);
  }
}
