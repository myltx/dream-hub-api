import { Test, TestingModule } from '@nestjs/testing';
import { SiteAccessLogService } from './siteAccessLog.service';

describe('LogService', () => {
  let service: SiteAccessLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteAccessLogService],
    }).compile();

    service = module.get<SiteAccessLogService>(SiteAccessLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
