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
  or: jest.fn().mockReturnThis(),
};

describe('WebsiteService', () => {
  let service: WebsiteService;

  beforeEach(async () => {
    jest.clearAllMocks();
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

  describe('create', () => {
    it('成功插入返回数据', async () => {
      mockSupabaseClient.insert.mockReturnThis();
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: { id: '1' },
        error: null,
      });
      mockSupabaseClient.from.mockReturnThis();
      const dto = {
        title: 'test',
        user_id: '1',
        url: 'https://test.com',
        category_id: '1',
        tags: ['a', 'b'],
      };
      const result = await service.create({ ...dto });
      expect(result).toEqual({ id: '1' });
    });
    it('插入失败抛出异常', async () => {
      mockSupabaseClient.insert.mockReturnThis();
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      mockSupabaseClient.from.mockReturnThis();
      await expect(
        service.create({
          title: 'test',
          user_id: '1',
          url: 'https://test.com',
          category_id: '1',
          tags: [],
        }),
      ).rejects.toThrow('Error creating category: fail');
    });
  });

  describe('update', () => {
    it('成功更新返回数据', async () => {
      mockSupabaseClient.update.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: { id: '1' },
        error: null,
      });
      mockSupabaseClient.from.mockReturnThis();
      const dto = {
        title: 'updated',
        userId: '1',
        url: 'https://test.com',
        category_id: '1',
        tags: [],
      };
      const result = await service.update('1', { ...dto });
      expect(result).toEqual({ id: '1' });
    });
    it('主表更新失败抛出异常', async () => {
      mockSupabaseClient.update.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      mockSupabaseClient.from.mockReturnThis();
      await expect(
        service.update('1', {
          title: 'updated',
          userId: '1',
          url: 'https://test.com',
          category_id: '1',
          tags: [],
        }),
      ).rejects.toThrow('Error updating website: fail');
    });
  });

  describe('findAll', () => {
    it('成功返回全部站点', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.order.mockResolvedValueOnce({
        data: [{ id: '1' }],
        error: null,
      });
      mockSupabaseClient.from.mockReturnThis();
      const result = await service.findAll();
      expect(result).toEqual([{ id: '1' }]);
    });
    it('查询失败抛出异常', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.order.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      mockSupabaseClient.from.mockReturnThis();
      await expect(service.findAll()).rejects.toThrow(
        'Error getting tafs: fail',
      );
    });
  });

  describe('findOne', () => {
    it('成功返回站点详情', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: { id: '1' },
        error: null,
      });
      mockSupabaseClient.from.mockReturnThis();
      const result = await service.findOne('1');
      expect(result).toEqual({ id: '1' });
    });
    it('查询失败抛出异常', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      mockSupabaseClient.from.mockReturnThis();
      await expect(service.findOne('1')).rejects.toThrow(
        'Error getting taf: fail',
      );
    });
  });

  describe('remove', () => {
    it('成功删除返回数据', async () => {
      mockSupabaseClient.delete.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: { id: '1' },
        error: null,
      });
      mockSupabaseClient.from.mockReturnThis();
      const result = await service.remove('1');
      expect(result).toEqual({ id: '1' });
    });
    it('删除失败抛出异常', async () => {
      mockSupabaseClient.delete.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      mockSupabaseClient.from.mockReturnThis();
      await expect(service.remove('1')).rejects.toThrow(
        'Error deleting website: fail',
      );
    });
  });

  // 其余如 findByQuery、findByQueryAll、findByQueryGroupAll、getRanking、increaseVisitCount 可按需补充
});
