import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PartialTemplatesService } from './partial-templates.service';
import { PartialTemplatesController } from './partial-templates.controller';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';

@Module({
  controllers: [PartialTemplatesController],
  providers: [PartialTemplatesService, PrismaService, PrismaErrorHandler],
})
export class PartialTemplatesModule {}
