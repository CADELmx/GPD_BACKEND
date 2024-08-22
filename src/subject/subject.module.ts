import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { PrismaService } from '../prisma.service';
import { validateForeignKeys } from '../common/validation/custom-validation.pipe';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

@Module({
  providers: [
    SubjectService,
    PrismaService,
    validateForeignKeys,
    PrismaErrorHandler,
  ],
  controllers: [SubjectController],
})
export class SubjectModule {}
