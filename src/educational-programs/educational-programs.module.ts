import { Module } from '@nestjs/common';
import { EducationalProgramsService } from './educational-programs.service';
import { EducationalProgramsController } from './educational-programs.controller';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

@Module({
  controllers: [EducationalProgramsController],
  providers: [EducationalProgramsService, PrismaService, PrismaErrorHandler],
})
export class EducationalProgramsModule {}
