import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivitiesDto, CreateActivityDto } from '../models/activity/create-activity.dto';
import { customIdPipe } from '../common/validation/custom-validation.pipe';
import { UpdateActivityDto } from '../models/activity/update-activity.dto';

@Controller('activity')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService
    ) { }
    @Post()
    create(
        @Body() createActivityDto: CreateActivityDto
    ) {
        return this.activityService.create(createActivityDto)
    }
    @Post('many')
    createMany(
        @Query('id') id: number,
        @Body() createManyActivities: CreateActivitiesDto[]
    ) {
        return this.activityService.createMany(id, createManyActivities)
    }
    @Get()
    find(
        @Query('id') id?: string,
        @Query('template', customIdPipe) template?: number
    ) {
        if (id) return this.activityService.findOne(id)
        if (template) return this.activityService.findByPartialTemplate(template)
        return this.activityService.findAll()
    }
    @Put(':id')
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
    removeByTemplate(@Param('id', customIdPipe) id: number) {
        return this.activityService.removeMany(id)
    }
}
