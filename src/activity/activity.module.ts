import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { PrismaService } from 'src/prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService, PrismaErrorHandler]
})
export class ActivityModule {}
