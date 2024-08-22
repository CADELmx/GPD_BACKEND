import { Test, TestingModule } from '@nestjs/testing';
import { PartialTemplatesController } from './partial-templates.controller';
import { PartialTemplatesService } from './partial-templates.service';
import { PrismaErrorHandler } from '../common/validation/prisma-error-handler';
import { PrismaService } from '../prisma.service';

describe('PartialTemplatesController', () => {
  let controller: PartialTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartialTemplatesController],
      providers: [PartialTemplatesService, PrismaService, PrismaErrorHandler],
    }).compile();

    controller = module.get<PartialTemplatesController>(
      PartialTemplatesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
