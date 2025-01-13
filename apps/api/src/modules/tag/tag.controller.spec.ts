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
    it('should call tagService.create with correct arguments', async () => {
      const result = { id: '1', name: 'Test Tag' };

      expect(await controller.create(mockCreateTagDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(mockCreateTagDto);
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
      const result = { success: true };

      expect(await controller.remove(id)).toEqual(result);
      expect(service.remove).toHaveBeenCalledWith(id);
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
});
