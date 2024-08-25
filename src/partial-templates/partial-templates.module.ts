import { Module } from '@nestjs/common';
import { PartialTemplatesService } from './partial-templates.service';
import { PartialTemplatesController } from './partial-templates.controller';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';


@Module({
  controllers: [PartialTemplatesController],
  providers: [PartialTemplatesService, PrismaService, PrismaErrorHandler],
})
export class PartialTemplatesModule {}
