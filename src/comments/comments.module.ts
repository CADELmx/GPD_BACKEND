import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, PrismaErrorHandler]
})
export class CommentsModule {}
