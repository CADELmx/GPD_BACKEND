import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from 'src/models/subject/create-subject.dto';
import { UpdateSubjectDto } from 'src/models/subject/update-subject.dto';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Post()
    create(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectService.create(createSubjectDto);
    }

    @Get()
    findAll() {
        return this.subjectService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.subjectService.findOne(id);
    }

    @Get('program/:id')
    findByProgram(@Param('id', ParseIntPipe) id: number) {
        return this.subjectService.findByProgram(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSubjectDto: UpdateSubjectDto) {
        return this.subjectService.update(id, updateSubjectDto);
    }
}
