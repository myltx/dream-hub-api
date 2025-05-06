import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './category.service';
import {
  mockCreateCategoryDto,
  mockUpdateCategoryDto,
  mockQueryCategoryDto,
  mockCategoryList,
  mockQueryResult,
} from '../../mock/category.mock';

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

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: 'SupabaseClient', useValue: mockSupabaseClient },
      ],
    }).compile();
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('成功插入返回数据', async () => {
      mockSupabaseClient.insert.mockResolvedValueOnce({
        data: [mockCategoryList[0]],
        error: null,
      });
      const result = await service.create(mockCreateCategoryDto);
      expect(result).toEqual([mockCategoryList[0]]);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('categories');
      expect(mockSupabaseClient.insert).toHaveBeenCalledWith([
        mockCreateCategoryDto,
      ]);
    });
    it('插入失败抛出异常', async () => {
      mockSupabaseClient.insert.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.create(mockCreateCategoryDto)).rejects.toThrow(
        'Error creating category: fail',
      );
    });
  });

  describe('findAll', () => {
    it('成功返回全部分类', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.order.mockResolvedValueOnce({
        data: mockCategoryList,
        error: null,
      });
      const result = await service.findAll();
      expect(result).toEqual(mockCategoryList);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('categories');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('*');
      expect(mockSupabaseClient.order).toHaveBeenCalledWith('sort_order', {
        ascending: false,
      });
    });
    it('查询失败抛出异常', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.order.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.findAll()).rejects.toThrow(
        'Error fetching categories: fail',
      );
    });
  });

  describe('update', () => {
    it('成功更新返回数据', async () => {
      mockSupabaseClient.eq.mockResolvedValueOnce({
        data: [mockCategoryList[0]],
        error: null,
      });
      const result = await service.update(1, mockUpdateCategoryDto);
      expect(result).toEqual([mockCategoryList[0]]);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('categories');
      expect(mockSupabaseClient.update).toHaveBeenCalledWith(
        mockUpdateCategoryDto,
      );
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('id', 1);
    });
    it('更新失败抛出异常', async () => {
      mockSupabaseClient.eq.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.update(1, mockUpdateCategoryDto)).rejects.toThrow(
        'Error updating category: fail',
      );
    });
  });

  describe('remove', () => {
    it('成功删除返回数据', async () => {
      mockSupabaseClient.eq.mockResolvedValueOnce({
        data: [mockCategoryList[0]],
        error: null,
      });
      const result = await service.remove(1);
      expect(result).toEqual([mockCategoryList[0]]);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('categories');
      expect(mockSupabaseClient.delete).toHaveBeenCalled();
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('id', 1);
    });
    it('删除失败抛出异常', async () => {
      mockSupabaseClient.eq.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.remove(1)).rejects.toThrow(
        'Error deleting category: fail',
      );
    });
  });

  describe('isCategoryBoundToWebsite', () => {
    it('未绑定返回false', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.limit.mockResolvedValueOnce({ data: [], error: null });
      const result = await service.isCategoryBoundToWebsite(1);
      expect(result).toBe(false);
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('websites');
      expect(mockSupabaseClient.select).toHaveBeenCalledWith('category_id');
      expect(mockSupabaseClient.eq).toHaveBeenCalledWith('category_id', 1);
      expect(mockSupabaseClient.limit).toHaveBeenCalledWith(1);
    });
    it('已绑定返回true', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.limit.mockResolvedValueOnce({
        data: [{ category_id: 1 }],
        error: null,
      });
      const result = await service.isCategoryBoundToWebsite(1);
      expect(result).toBe(true);
    });
    it('查询失败抛出异常', async () => {
      mockSupabaseClient.select.mockReturnThis();
      mockSupabaseClient.eq.mockReturnThis();
      mockSupabaseClient.limit.mockResolvedValueOnce({
        data: null,
        error: { message: 'fail' },
      });
      await expect(service.isCategoryBoundToWebsite(1)).rejects.toThrow(
        '检查绑定关系时出错: fail',
      );
    });
  });
});
