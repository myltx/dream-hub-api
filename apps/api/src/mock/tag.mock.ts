// src/mock/tag.mock.ts

import { CreateTagDto } from '../modules/tag/dto/create-tag.dto';
import { UpdateTagDto } from '../modules/tag/dto/update-tag.dto';
import { QueryTagDto } from '../modules/tag/dto/query-tag.dto';

export const mockCreateTagDto: CreateTagDto = {
  name: 'Test Tag',
  user_id: '1',
};

export const mockUpdateTagDto: UpdateTagDto = { name: 'Updated Tag' };

export const mockQueryTagDto: QueryTagDto = { name: 'Tag Query' };

export const mockTagList = [
  { id: '1', name: 'Tag 1' },
  { id: '2', name: 'Tag 2' },
];

export const mockQueryResult = {
  limit: 10,
  page: 1,
  total: 1,
  list: [{ id: '1', name: 'Tag Query' }],
  totalPages: 1,
};

export const mockTagService = {
  create: jest.fn().mockResolvedValue({ id: '1', name: 'Test Tag' }),
  update: jest.fn().mockResolvedValue({ id: '1', name: 'Updated Tag' }),
  remove: jest.fn().mockResolvedValue({ success: true }),
  findAll: jest.fn().mockResolvedValue(mockTagList),
  findByQuery: jest.fn().mockResolvedValue(mockQueryResult),
};
