import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EducationalProgramsService } from './educational-programs.service';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';
import { EducationalProgramsController } from './educational-programs.controller';

@Module({
  controllers: [EducationalProgramsController],
  providers: [EducationalProgramsService, PrismaService, PrismaErrorHandler],
})
export class EducationalProgramsModule {}
