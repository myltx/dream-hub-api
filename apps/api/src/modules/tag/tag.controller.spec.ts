import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import {
  mockCreateTagDto,
  mockUpdateTagDto,
  mockQueryTagDto,
  mockTagList,
  mockQueryResult,
  mockTagService,
} from '../../mock/tag.mock';
import { Param, Get } from '@nestjs/common';

describe('TagController', () => {
  let controller: TagController;
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockTagService,
        },
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
    service = module.get<TagService>(TagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call tagService.create with correct arguments and user', async () => {
      const user = { sub: '1' };
      const result = { id: '1', name: 'Test Tag' };
      expect(await controller.create(mockCreateTagDto, user)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith({
        ...mockCreateTagDto,
        user_id: user.sub,
      });
    });
  });

  describe('update', () => {
    it('should call tagService.update with correct arguments', async () => {
      const id = '1';
      const result = { id, name: 'Updated Tag' };
      expect(await controller.update(id, mockUpdateTagDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, mockUpdateTagDto);
    });
  });

  describe('remove', () => {
    it('should call tagService.remove with correct arguments', async () => {
      const id = '1';
      mockTagService.isTagBoundToWebsite.mockResolvedValue(false);
      const result = { success: true };
      expect(await controller.remove(id)).toEqual(result);
      expect(service.isTagBoundToWebsite).toHaveBeenCalledWith(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
    it('should throw error if tag is bound to website', async () => {
      const id = '1';
      mockTagService.isTagBoundToWebsite.mockResolvedValue(true);
      await expect(controller.remove(id)).rejects.toThrow(
        '标签已绑定站点，无法删除',
      );
    });
  });

  describe('findAll', () => {
    it('should call tagService.findAll and return result', async () => {
      expect(await controller.findAll()).toEqual(mockTagList);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllPublic', () => {
    it('should call tagService.findAll and return result', async () => {
      expect(await controller.findAllPublic()).toEqual(mockTagList);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findByQuery', () => {
    it('should call tagService.findByQuery with correct arguments', async () => {
      expect(await controller.findByQuery(mockQueryTagDto)).toEqual(
        mockQueryResult,
      );
      expect(service.findByQuery).toHaveBeenCalledWith(mockQueryTagDto);
    });
  });

  // 新增 findOne 测试
  describe('findOne', () => {
    it('should call tagService.findOne with correct arguments', async () => {
      const id = '1';
      const tag = { id: '1', name: 'Test Tag' };
      service.findOne = jest.fn().mockResolvedValue(tag);
      expect(await controller.findOne(id)).toEqual(tag);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
    it('should throw error if tagService.findOne throws', async () => {
      const id = '1';
      const error = new Error('not found');
      service.findOne = jest.fn().mockRejectedValue(error);
      await expect(controller.findOne(id)).rejects.toThrow('not found');
    });
  });
});
