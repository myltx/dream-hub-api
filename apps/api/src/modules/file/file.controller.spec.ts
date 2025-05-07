import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { SupabaseService } from '../../database/supabase/supabase.service';

describe('FileController', () => {
  let controller: FileController;

  const mockFileService = {
    uploadFile: jest.fn(),
    findByQuery: jest.fn(),
    getFileById: jest.fn(),
    getMarkdownFileContent: jest.fn(),
    deleteFile: jest.fn(),
  };

  const mockSupabaseService = {
    getClient: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        { provide: FileService, useValue: mockFileService },
        { provide: SupabaseService, useValue: mockSupabaseService },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
