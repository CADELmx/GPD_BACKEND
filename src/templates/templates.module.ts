import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService, PrismaService, PrismaErrorHandler],
})
export class TemplatesModule {}
