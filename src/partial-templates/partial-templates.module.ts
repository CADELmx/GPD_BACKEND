import { Module } from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { PartialTemplatesController } from './partial-templates.controller';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PartialTemplatesController],
  providers: [PartialTemplatesService, PrismaService, PrismaErrorHandler],
})
export class PartialTemplatesModule {}
