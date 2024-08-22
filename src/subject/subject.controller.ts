import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from '../models/subject/create-subject.dto';
import { customIdPipe } from '../common/validation/custom-validation.pipe';
import { UpdateSubjectDto } from '../models/subject/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) { }
  /**
   * Handles the post request to create a new subject
   * @param createSubjectDto
   * @returns
   */
  @ApiOperation({ summary: 'Crear una materia' })
  @ApiTags('Materias')
  @ApiResponse({ status: 201, description: 'Materia creada' })
  @ApiResponse({ status: 400, description: 'Error en la petición' })
  @ApiBody({ description: 'Datos de la materia a registrar', type: CreateSubjectDto })
  @ApiCreatedResponse({ description: 'Datos de la materia a registrar', type: CreateSubjectDto })
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }
  /**
   * Handles the get request to get all subjects
   * @returns
   */
  @ApiOperation({ summary: 'Obtener todas las materias' })
  @ApiTags('Materias')
  @ApiResponse({ status: 200, description: 'Materias encontradas' })
  @ApiResponse({ status: 404, description: 'Materias no encontradas' })
  @ApiResponse({ status: 400, description: 'Error en la petición' })
  @ApiCreatedResponse({ type: CreateSubjectDto, isArray: true })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'programid', required: false, type: Number })
  @Get()
  find(
    @Query('id', customIdPipe) id?: number,
    @Query(
      'programid',
      new ParseIntPipe({
        optional: true,
        exceptionFactory: () => {
          return new BadRequestException('El id del programa no es un número');
        },
      }),
    )
    programId?: number,
  ) {
    if (id) return this.subjectService.findByProgram(id);
    if (programId) return this.subjectService.findByProgram(programId);
    return this.subjectService.findAll();
  }
  /**
   * Handles the patch request to update a subject
   * @param id
   * @param updateSubjectDto
   * @returns
   */
  @ApiOperation({ summary: 'Actualizar una materia' })
  @ApiTags('Materias')
  @ApiCreatedResponse({ type: UpdateSubjectDto })
  @ApiResponse({ status: 200, description: 'Materia actualizada' })
  @ApiResponse({ status: 400, description: 'Error en la petición' })
  @ApiResponse({ status: 404, description: 'Materia no encontrada' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiBody({ description: 'Datos de la materia a actualizar', type: UpdateSubjectDto })
  @Put(':id')
  update(
    @Param('id', customIdPipe) id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectService.update(id, updateSubjectDto);
  }
  /**
   * Handles the delete request to delete a subject
   * @param id
   * @returns
   */
  @ApiOperation({ summary: 'Eliminar una materia' })
  @ApiTags('Materias')
  @ApiParam({ name: 'id', required: true, type: Number })
  @Delete(':id')
  delete(@Param('id', customIdPipe) id: number) {
    return this.subjectService.delete(id);
  }
}
