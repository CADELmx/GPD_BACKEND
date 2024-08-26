import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AreasController],
  providers: [AreasService, PrismaService, PrismaErrorHandler],
})
export class AreasModule {}
