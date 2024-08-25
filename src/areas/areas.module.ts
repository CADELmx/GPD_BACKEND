import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';


@Module({
  controllers: [AreasController],
  providers: [AreasService, PrismaService, PrismaErrorHandler],
})
export class AreasModule {}
