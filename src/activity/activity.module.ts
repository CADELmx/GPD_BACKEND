import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService]
})
export class ActivityModule {}
