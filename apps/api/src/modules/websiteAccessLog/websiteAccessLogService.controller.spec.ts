import { Test, TestingModule } from '@nestjs/testing';
import { SiteAccessLogController } from '../siteAccessLog/siteAccessLog.controller';
import { SiteAccessLogService } from '../siteAccessLog/siteAccessLog.service';

const mockSupabaseClient = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  // ...如有需要可继续补充
};

describe('SiteAccessLogController', () => {
  let controller: SiteAccessLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteAccessLogController],
      providers: [
        SiteAccessLogService,
        { provide: 'SupabaseClient', useValue: mockSupabaseClient },
      ],
    }).compile();

    controller = module.get<SiteAccessLogController>(SiteAccessLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
