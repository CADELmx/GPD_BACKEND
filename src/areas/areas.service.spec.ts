import { Test, TestingModule } from '@nestjs/testing';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { PrismaService } from '../prisma.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';

describe('AreasService', () => {
  let service: AreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreasController],
      providers: [AreasService, PrismaService, PrismaErrorHandler],
    }).compile();

    service = module.get<AreasService>(AreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
