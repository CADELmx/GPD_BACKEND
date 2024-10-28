import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { PrismaService } from '../prisma.service';
import { validateForeignKeys } from '../common/validation/custom-validation.pipe';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

describe('SubjectController', () => {
  let controller: SubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        PrismaService,
        validateForeignKeys,
        PrismaErrorHandler,
      ],
      controllers: [SubjectController],
    }).compile();

    controller = module.get<SubjectController>(SubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
