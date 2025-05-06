import { Test, TestingModule } from '@nestjs/testing';
import { WebsiteService } from './website.service';

const mockSupabaseClient = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis(),
  ilike: jest.fn().mockReturnThis(),
  range: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
};

describe('WebsiteService', () => {
  let service: WebsiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebsiteService,
        { provide: 'SupabaseClient', useValue: mockSupabaseClient },
      ],
    }).compile();

    service = module.get<WebsiteService>(WebsiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
