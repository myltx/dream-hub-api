import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SupabaseService } from './database/supabase/supabase.service';

const mockSupabaseService = {};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: SupabaseService, useValue: mockSupabaseService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getData', () => {
    it('should return welcome html page', () => {
      const result = appController.getData();
      expect(result).toContain('<title>欢迎使用 Dream Hub API</title>');
      expect(result).toContain('Dream Hub API');
      expect(result).toContain('html');
    });
  });
});
