import { Test, TestingModule } from '@nestjs/testing';
import { RedcapController } from './redcap.controller';
import { RedcapService } from './redcap.service';

describe('RedcapController', () => {
  let controller: RedcapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedcapController],
      providers: [RedcapService],
    }).compile();

    controller = module.get<RedcapController>(RedcapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
