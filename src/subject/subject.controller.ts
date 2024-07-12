import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from 'src/models/subject/create-subject.dto';
import { UpdateSubjectDto } from 'src/models/subject/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  /**
   * Handles the post request to create a new subject
   * @param createSubjectDto
   * @returns
   */
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }
  /**
   * Handles the get request to get all subjects
   * @returns
   */
  @Get()
  findAll() {
    return this.subjectService.findAll();
  }
  /**
   * Handles the get request to get a subject by id
   * @param id
   * @returns
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.findOne(id);
  }
  /**
   * Handles the get request to get all subjects by program id
   * @param id
   * @returns
   */
  @Get('program/:id')
  findByProgram(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.findByProgram(id);
  }
  /**
   * Handles the patch request to update a subject
   * @param id
   * @param updateSubjectDto
   * @returns
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectService.update(id, updateSubjectDto);
  }
  /**
   * Handles the delete request to delete a subject
   * @param id
   * @returns
   */
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.delete(id);
  }
}
