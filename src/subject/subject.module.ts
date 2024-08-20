import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { PrismaService } from 'src/prisma.service';
import { SubjectController } from './subject.controller';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';
import { validateForeignKeys } from 'src/common/validation/custom-validation.pipe';

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
