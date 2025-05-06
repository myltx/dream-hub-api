import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import {
  mockCreateTagDto,
  mockUpdateTagDto,
  mockQueryTagDto,
  mockTagList,
  mockQueryResult,
} from '../../mock/tag.mock';

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

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        { provide: 'SupabaseClient', useValue: mockSupabaseClient },
      ],
    }).compile();
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('成功插入返回数据', async () => {
      mockSupabaseClient.insert.mockResolvedValueOnce({
        data: [mockTagList[0]],
        error: null,
      });
      const result = await service.create(mockCreateTagDto);
      expect(result).toEqual([mockTagList[0]]);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('tags');
      expect(mockSupabaseClient.insert).toHaveBeenCalledWith([
        mockCreateTagDto,
      ]);
    });
    it('插入失败抛出异常', async () => {
      mockSupabaseClient.insert.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.create(mockCreateTagDto)).rejects.toThrow(
        'Error creating category: fail',
      );
    });
  });

  describe('findAll', () => {
    it('成功返回全部标签', async () => {
      mockSupabaseClient.select.mockResolvedValueOnce({
        data: mockTagList,
        error: null,
      });
      const result = await service.findAll();
      expect(result).toEqual(mockTagList);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('tags');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('*');
    });
    it('查询失败抛出异常', async () => {
      mockSupabaseClient.select.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.findAll()).rejects.toThrow(
        'Error fetching tags: fail',
      );
    });
  });

  describe('findOne', () => {
    it('成功返回标签详情', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: mockTagList[0],
        error: null,
      });
      const result = await service.findOne('1');
      expect(result).toEqual(mockTagList[0]);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('tags');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('*');
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('id', '1');
      expect(mockSupabaseClient.single).toHaveBeenCalled();
    });
    it('查询失败抛出异常', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.findOne('1')).rejects.toThrow(
        'Error fetching tag: fail',
      );
    });
  });

  describe('update', () => {
    it('成功更新返回数据', async () => {
      mockSupabaseClient.update.mockReturnThis();
      mockSupabaseClient.eq.mockResolvedValueOnce({
        data: [mockTagList[0]],
        error: null,
      });
      const result = await service.update('1', mockUpdateTagDto);
      expect(result).toEqual([mockTagList[0]]);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('tags');
      expect(mockSupabaseClient.update).toHaveBeenCalledWith(mockUpdateTagDto);
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('id', '1');
    });
    it('更新失败抛出异常', async () => {
      mockSupabaseClient.update.mockReturnThis();
      mockSupabaseClient.eq.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.update('1', mockUpdateTagDto)).rejects.toThrow(
        'Error updating taf: fail',
      );
    });
  });

  describe('remove', () => {
    it('成功删除返回数据', async () => {
      mockSupabaseClient.delete.mockReturnThis();
      mockSupabaseClient.eq.mockResolvedValueOnce({
        data: [mockTagList[0]],
        error: null,
      });
      const result = await service.remove('1');
      expect(result).toEqual([mockTagList[0]]);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('tags');
      expect(mockSupabaseClient.delete).toHaveBeenCalled();
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('id', '1');
    });
    it('删除失败抛出异常', async () => {
      mockSupabaseClient.delete.mockReturnThis();
      mockSupabaseClient.eq.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.remove('1')).rejects.toThrow(
        'Error deleting tag: fail',
      );
    });
  });

  describe('findByQuery', () => {
    it('成功返回查询结果', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.ilike.mockReturnThis();
      mockSupabaseClient.range.mockResolvedValueOnce({
        data: mockTagList,
        error: null,
        count: 2,
      });
      const userQuery = { ...mockQueryTagDto };
      const result = await service.findByQuery(userQuery);
      expect(result.list).toEqual(mockTagList);
      expect(result.total).toEqual(2);
      expect(result.page).toEqual(userQuery.page);
      expect(result.limit).toEqual(userQuery.limit);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('tags');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('*', {
        count: 'exact',
      });
    });
    it('查询失败抛出异常', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.ilike.mockReturnThis();
      mockSupabaseClient.range.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
        count: 0,
      });
      await expect(service.findByQuery(mockQueryTagDto)).rejects.toThrow(
        '查询出错: fail',
      );
    });
  });

  describe('isTagBoundToWebsite', () => {
    it('未绑定返回false', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.limit.mockResolvedValueOnce({ data: [], error: null });
      const result = await service.isTagBoundToWebsite('1');
      expect(result).toBe(false);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('website_tags');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('website_id');
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('tag_id', '1');
      expect(mockSupabaseClient.limit).toHaveBeenCalledWith(1);
    });
    it('已绑定返回true', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.limit.mockResolvedValueOnce({
        data: [{ website_id: 1 }],
        error: null,
      });
      const result = await service.isTagBoundToWebsite('1');
      expect(result).toBe(true);
    });
    it('查询失败抛出异常', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.limit.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.isTagBoundToWebsite('1')).rejects.toThrow(
        '检查绑定关系时出错: fail',
      );
    });
  });
});
