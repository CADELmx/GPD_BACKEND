import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { validateForeignKeys } from '../common/validation/custom-validation.pipe';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';


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
