import { Test, TestingModule } from '@nestjs/testing';
import { PersonalDataController } from './personal-data.controller';

describe('PersonalDataController', () => {
  let controller: PersonalDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalDataController],
    }).compile();

    controller = module.get<PersonalDataController>(PersonalDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
