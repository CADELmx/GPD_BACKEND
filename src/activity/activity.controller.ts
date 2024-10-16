import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from '../models/activity/create-activity.dto';
import { customIdPipe } from '../common/validation/custom-validation.pipe';
import { UpdateActivityDto } from '../models/activity/update-activity.dto';

@Controller('activity')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService
    ) { }
    @Post()
    create(@Body() createActivityDto: CreateActivityDto) {
        return this.activityService.create(createActivityDto)
    }
    @Get()
    find(@Query('id') id?: string) {
        if (id) return this.activityService.findOne(id)
        return this.activityService.findAll()
    }
    @Put()
    update(
        @Param('id') id: string,
        @Body() updateActivityDto: UpdateActivityDto
    ) {
        return this.activityService.update(id, updateActivityDto)
    }
    @Delete(':id')
    remove(
        @Param('id') id: string
    ) {
        if (id) return this.activityService.remove(id)
    }
    @Delete('/tmpldel:id')
    removeByTemplate(@Param('id', customIdPipe) id: number){
        return this.activityService.removeMany(id)
    }
}
