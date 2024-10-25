import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCommentDto } from '../models/comments/create-comment.dto';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from '../models/comments/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentService: CommentsService
    ) { }

    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto)
    }
    @Get()
    find(
        @Query('id') id?: number
    ) {
        if (id) return this.commentService.findOne(id)
        return this.commentService.findAll()
    }
    @Put()
    update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.update(id, updateCommentDto)
    }
    @Delete()
    delete(@Param('id') id: number) {
        return this.commentService.delete(id)
    }
}
