import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { PrismaService } from '../prisma.service';
import { validateForeignKeys } from '../common/validation/custom-validation.pipe';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { SubjectController } from './subject.controller';

describe('SubjectService', () => {
  let service: SubjectService;

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

    service = module.get<SubjectService>(SubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
