import { Module } from '@nestjs/common';
import { PersonalDataService } from './personal-data.service';
import { PersonalDataController } from './personal-data.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaErrorHandler } from 'src/common/validation/prisma-error-handler';

@Module({
  providers: [PersonalDataService, PrismaService, PrismaErrorHandler],
  controllers: [PersonalDataController]
})
export class PersonalDataModule { }
