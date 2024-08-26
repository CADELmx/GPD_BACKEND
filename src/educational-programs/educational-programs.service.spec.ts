import { Test, TestingModule } from '@nestjs/testing';
import { EducationalProgramsService } from './educational-programs.service';
import { EducationalProgramsController } from './educational-programs.controller';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';

describe('EducationalProgramsService', () => {
  let service: EducationalProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalProgramsController],
      providers: [EducationalProgramsService, PrismaService, PrismaErrorHandler],
    }).compile();

    service = module.get<EducationalProgramsService>(
      EducationalProgramsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
