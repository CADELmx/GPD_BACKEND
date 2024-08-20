import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { PrismaService } from 'src/prisma.service';
import { AreasController } from './areas.controller';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';

@Module({
  controllers: [AreasController],
  providers: [AreasService, PrismaService, PrismaErrorHandler],
})
export class AreasModule {}
