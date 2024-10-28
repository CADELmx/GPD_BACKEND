import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';

describe('TemplatesService', () => {
  let service: TemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplatesController],
      providers: [TemplatesService, PrismaService, PrismaErrorHandler],
    }).compile();

    service = module.get<TemplatesService>(TemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
