import { Test, TestingModule } from '@nestjs/testing';
import { SiteAccessLogController } from './siteAccessLog.controller';

describe('SiteAccessLogController', () => {
  let controller: SiteAccessLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteAccessLogController],
    }).compile();

    controller = module.get<SiteAccessLogController>(SiteAccessLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
