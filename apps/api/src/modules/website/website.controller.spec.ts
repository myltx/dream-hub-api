import { Test, TestingModule } from '@nestjs/testing';
import { WebsiteController } from './website.controller';
import { WebsiteService } from './website.service';

const mockWebsiteService = {
  create: jest.fn().mockResolvedValue({ id: '1', title: 'test' }),
  update: jest.fn().mockResolvedValue({ id: '1', title: 'updated' }),
  remove: jest.fn().mockResolvedValue({ success: true }),
  findAll: jest.fn().mockResolvedValue([{ id: '1', title: 'test' }]),
  findByQuery: jest.fn().mockResolvedValue({ list: [{ id: '1' }], total: 1 }),
  findByQueryAll: jest.fn().mockResolvedValue([{ id: '1' }]),
  findByQueryGroupAll: jest
    .fn()
    .mockResolvedValue({ groupedData: [], total: 0 }),
  getRanking: jest.fn().mockResolvedValue([{ id: '1', rank: 1 }]),
  increaseVisitCount: jest.fn().mockResolvedValue({ id: '1', visitCount: 2 }),
};

describe('WebsiteController', () => {
  let controller: WebsiteController;
  let service: WebsiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebsiteController],
      providers: [{ provide: WebsiteService, useValue: mockWebsiteService }],
    }).compile();

    controller = module.get<WebsiteController>(WebsiteController);
    service = module.get<WebsiteService>(WebsiteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call websiteService.create with correct arguments', async () => {
      const dto = {
        title: 'test',
        user_id: '1',
        url: 'https://test.com',
        category_id: '1',
      };
      const user = { sub: '1' };
      await controller.create(dto, user);
      expect(service.create).toHaveBeenCalledWith({
        ...dto,
        user_id: user.sub,
      });
    });
  });

  describe('update', () => {
    it('should call websiteService.update with correct arguments', async () => {
      const id = '1';
      const dto = {
        title: 'updated',
        userId: '1',
        url: 'https://test.com',
        category_id: '1',
      };
      await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should call websiteService.remove with correct arguments', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should call websiteService.findAll and return result', async () => {
      expect(await controller.findAll()).toEqual([{ id: '1', title: 'test' }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllPublic', () => {
    it('should call websiteService.findAll and return result', async () => {
      expect(await controller.findAllPublic()).toEqual([
        { id: '1', title: 'test' },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findByQuery', () => {
    it('should call websiteService.findByQuery with correct arguments', async () => {
      const query = { title: 'test' };
      const user = { sub: '1' };
      const req = {};
      await controller.findByQuery(query, user, req);
      expect(service.findByQuery).toHaveBeenCalledWith(query, user);
    });
  });

  describe('findByQueryAll', () => {
    it('should call websiteService.findByQueryAll with correct arguments', async () => {
      const query = { title: 'test' };
      const user = { sub: '1' };
      await controller.findByQueryAll(query, user);
      expect(service.findByQueryAll).toHaveBeenCalledWith(query, user);
    });
  });

  describe('findAllWebsite', () => {
    it('should call websiteService.findByQueryGroupAll with correct arguments', async () => {
      const user = { sub: '1' };
      await controller.findAllWebsite(user);
      expect(service.findByQueryGroupAll).toHaveBeenCalledWith({
        user_id: user.sub,
      });
    });
  });

  describe('getRanking', () => {
    it('should call websiteService.getRanking', async () => {
      await controller.getRanking();
      expect(service.getRanking).toHaveBeenCalled();
    });
  });

  describe('increaseVisitCount', () => {
    it('should call websiteService.increaseVisitCount with correct arguments', async () => {
      const id = '1';
      await controller.increaseVisitCount(id);
      expect(service.increaseVisitCount).toHaveBeenCalledWith(id);
    });
  });
});
