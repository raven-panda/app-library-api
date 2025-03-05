import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const mockModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockModel,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
