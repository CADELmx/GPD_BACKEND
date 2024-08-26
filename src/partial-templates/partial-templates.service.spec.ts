import { Test, TestingModule } from '@nestjs/testing';
import { PartialTemplatesService } from './partial-templates.service';
import { PartialTemplatesController } from './partial-templates.controller';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

describe('PartialTemplatesService', () => {
  let service: PartialTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartialTemplatesController],
      providers: [PartialTemplatesService, PrismaService, PrismaErrorHandler],
    }).compile();

    service = module.get<PartialTemplatesService>(PartialTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
