import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCommentDto } from '../models/comments/create-comment.dto';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from '../models/comments/update-comment.dto';
import { Public } from '../auth/decorators/public.decorator';
import { customIdPipe } from '../common/validation/custom-validation.pipe';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentService: CommentsService
    ) { }
    @Public()
    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        console.log(createCommentDto);
        return this.commentService.create(createCommentDto)
    }
    @Public()
    @Get()
    find(
        @Query('id') id?: number
    ) {
        if (id) return this.commentService.findOne(id)
        return this.commentService.findAll()
    }
    @Put(':id')
    update(@Param('id', customIdPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.update(id, updateCommentDto)
    }
    @Delete(':id')
    delete(@Param('id', customIdPipe) id: number) {
        return this.commentService.delete(id)
    }
}
