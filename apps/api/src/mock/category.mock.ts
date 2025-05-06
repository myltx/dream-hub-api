import { CreateCategoryDto } from '../modules/category/dto/create-category.dto';
import { UpdateCategoryDto } from '../modules/category/dto/update-category.dto';
import { QueryCategoryDto } from '../modules/category/dto/query-category.dto';

export const mockCreateCategoryDto: CreateCategoryDto = {
  name: '测试分类',
  description: '测试描述',
  user_id: '1',
  sortOrder: 1,
};

export const mockUpdateCategoryDto: UpdateCategoryDto = {
  name: '更新分类',
  description: '更新描述',
  sortOrder: 2,
};

export const mockQueryCategoryDto: QueryCategoryDto = {
  name: '测试',
  description: '描述',
  page: 1,
  limit: 10,
};

export const mockCategoryList = [
  { id: 1, name: '分类1', description: '描述1', user_id: '1', sortOrder: 1 },
  { id: 2, name: '分类2', description: '描述2', user_id: '2', sortOrder: 2 },
];

export const mockQueryResult = {
  limit: 10,
  page: 1,
  total: 2,
  list: mockCategoryList,
  totalPages: 1,
};

export const mockCategoryService = {
  create: jest.fn().mockResolvedValue({ id: 1, ...mockCreateCategoryDto }),
  update: jest.fn().mockResolvedValue({ id: 1, ...mockUpdateCategoryDto }),
  remove: jest.fn().mockResolvedValue({ success: true }),
  findAll: jest.fn().mockResolvedValue(mockCategoryList),
  findByQuery: jest.fn().mockResolvedValue(mockQueryResult),
  isCategoryBoundToWebsite: jest.fn().mockResolvedValue(false),
};
