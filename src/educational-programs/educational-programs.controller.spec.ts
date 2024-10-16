import { Test, TestingModule } from '@nestjs/testing';
import { EducationalProgramsController } from './educational-programs.controller';
import { EducationalProgramsService } from './educational-programs.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';

describe('EducationalProgramsController', () => {
  let controller: EducationalProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationalProgramsController],
      providers: [EducationalProgramsService, PrismaService, PrismaErrorHandler],
    }).compile();

    controller = module.get<EducationalProgramsController>(
      EducationalProgramsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
