import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './category.controller';
import { CategoriesService } from './category.service';
import {
  mockCreateCategoryDto,
  mockUpdateCategoryDto,
  mockQueryCategoryDto,
  mockCategoryList,
  mockQueryResult,
  mockCategoryService,
} from '../../mock/category.mock';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call categoriesService.create with correct arguments', async () => {
      const user = { sub: '1' };
      const result = { id: 1, ...mockCreateCategoryDto };
      expect(await controller.create(mockCreateCategoryDto, user)).toEqual(
        result,
      );
      expect(service.create).toHaveBeenCalledWith({
        ...mockCreateCategoryDto,
        user_id: user.sub,
      });
    });
  });

  describe('update', () => {
    it('should call categoriesService.update with correct arguments', async () => {
      const id = 1;
      const result = { id, ...mockUpdateCategoryDto };
      expect(await controller.update(id, mockUpdateCategoryDto)).toEqual(
        result,
      );
      expect(service.update).toHaveBeenCalledWith(id, mockUpdateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should call categoriesService.remove with correct arguments', async () => {
      const id = 1;
      mockCategoryService.isCategoryBoundToWebsite.mockResolvedValue(false);
      const result = { success: true };
      expect(await controller.remove(id)).toEqual(result);
      expect(service.isCategoryBoundToWebsite).toHaveBeenCalledWith(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
    it('should throw error if category is bound to website', async () => {
      const id = 1;
      mockCategoryService.isCategoryBoundToWebsite.mockResolvedValue(true);
      await expect(controller.remove(id)).rejects.toThrow(
        '分类已绑定站点，无法删除',
      );
    });
  });

  describe('findAll', () => {
    it('should call categoriesService.findAll and return result', async () => {
      expect(await controller.findAll()).toEqual(mockCategoryList);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllPublic', () => {
    it('should call categoriesService.findAll and return result', async () => {
      expect(await controller.findAllPublic()).toEqual(mockCategoryList);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findByQuery', () => {
    it('should call categoriesService.findByQuery with correct arguments', async () => {
      const user = { user_id: '1', roles: ['用户'] };
      expect(await controller.findByQuery(mockQueryCategoryDto, user)).toEqual(
        mockQueryResult,
      );
      expect(service.findByQuery).toHaveBeenCalledWith(
        { ...mockQueryCategoryDto },
        user,
      );
    });
  });
});
