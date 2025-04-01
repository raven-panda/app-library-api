import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateBookDto } from './dto/create-book.dto';
import { AppModule } from '../app.module';
import { BookDto } from './dto/book.dto';
import { AuthorService } from '../author/author.service';
import { AuthorDto } from '../author/dto/author.dto';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from '../author/entities/author.entity';
import { Book } from './entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateBookDto } from './dto/update-book.dto';

const getTestCreateDto = (authorId?: string): CreateBookDto =>
  ({
    title: 'The Mysterious Island',
    authorId: authorId,
    coverFileId: 'fixture-book.jpg',
    isForRent: false,
    price: 10,
    description: 'Lorem ipsum',
    isbn: '978-2-07-036002-4',
    editor: 'Penguin',
    genre: 'NOVEL',
    themes: ['TRAVEL_EXPLORATION', 'DREAM_IMAGINARY'],
    format: 'PAPERBACK',
    isPhysicalFormat: true,
    languageCode: 'fr',
    targetAudience: 'ENTERTAINMENT',
  }) as CreateBookDto;

describe('Given I do action on Book', () => {
  let module: TestingModule;
  let bookController: BookController;
  let bookService: BookService;
  let authorService: AuthorService;

  let authorRepository: Repository<Author>;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    jest.clearAllMocks();
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    bookService = module.get<BookService>(BookService);
    authorService = module.get<AuthorService>(AuthorService);
    bookController = module.get<BookController>(BookController);

    authorRepository = module.get<Repository<Author>>(
      getRepositoryToken(Author),
    );
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  afterEach(async () => {
    if (bookRepository) await bookRepository.query('DELETE FROM book');
    if (authorRepository) await authorRepository.query('DELETE FROM author');
    await module.close();
  });

  test('Then controller and service should be defined', () => {
    expect(bookService).toBeDefined();
    expect(authorService).toBeDefined();
    expect(bookController).toBeDefined();

    expect(authorRepository).toBeDefined();
    expect(bookRepository).toBeDefined();
  });

  describe('When I call BookController.findOne', () => {
    test('Then it should return a BookDto', async () => {
      const createAuthorResult = await authorService.create({
        firstName: 'test',
        lastName: 'anotherTest',
      } as AuthorDto);

      const createBookResult = await bookController.create(
        getTestCreateDto(createAuthorResult.id),
      );

      const findOneResult = await bookController.findOne(
        createBookResult.id ?? '',
      );

      expect(findOneResult).toBeTruthy();
      expect(findOneResult).toHaveProperty('id');
      expect(findOneResult).toMatchObject({
        title: 'The Mysterious Island',
        author: createAuthorResult,
        coverFileId: 'fixture-book.jpg',
        isForRent: false,
        price: 10,
        description: 'Lorem ipsum',
        isbn: '978-2-07-036002-4',
        editor: 'Penguin',
        genre: 'NOVEL',
        themes: ['TRAVEL_EXPLORATION', 'DREAM_IMAGINARY'],
        format: 'PAPERBACK',
        isPhysicalFormat: true,
        languageCode: 'fr',
        targetAudience: 'ENTERTAINMENT',
      });
    });
  });

  describe('When I call BookController.findOne without existing book id', () => {
    test('Then it should throw a NotFoundException', async () => {
      let findOneResult: BookDto | undefined = undefined;
      let error: any;

      try {
        findOneResult = await bookController.findOne('inexistant-id');
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(findOneResult).toBeUndefined();
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    });
  });

  describe('When I call BookController.create', () => {
    test('Then it should return a BookDto', async () => {
      const createAuthorResult = await authorService.create({
        firstName: 'test',
        lastName: 'anotherTest',
      } as AuthorDto);

      expect(createAuthorResult.id).toBeDefined();

      const serviceCreateSpy = jest.spyOn(bookService, 'create');
      const createBookResult = await bookController.create(
        getTestCreateDto(createAuthorResult.id),
      );

      expect(serviceCreateSpy).toHaveBeenCalled();

      expect(createBookResult).toBeTruthy();
      expect(createBookResult).toHaveProperty('id');
      expect(createBookResult).toMatchObject({
        title: 'The Mysterious Island',
        author: createAuthorResult,
        coverFileId: 'fixture-book.jpg',
        isForRent: false,
        price: 10,
        description: 'Lorem ipsum',
        isbn: '978-2-07-036002-4',
        editor: 'Penguin',
        genre: 'NOVEL',
        themes: ['TRAVEL_EXPLORATION', 'DREAM_IMAGINARY'],
        format: 'PAPERBACK',
        isPhysicalFormat: true,
        languageCode: 'fr',
        targetAudience: 'ENTERTAINMENT',
      });
    });
  });

  describe('When I call BookController.create existing author id', () => {
    test('Then it should throw a NotFoundException', async () => {
      const serviceCreateSpy = jest.spyOn(bookService, 'create');

      let createResult: BookDto | undefined = undefined;
      let error: any;

      try {
        createResult = await bookController.create(getTestCreateDto());
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(serviceCreateSpy).toHaveBeenCalled();

      expect(createResult).toBeUndefined();

      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    });
  });

  describe('When I call BookController.update', () => {
    test('Then it should return a BookDto', async () => {
      const createAuthorResult = await authorService.create({
        firstName: 'test',
        lastName: 'anotherTest',
      } as AuthorDto);

      const createBookResult = await bookController.create(
        getTestCreateDto(createAuthorResult.id),
      );

      const updateBookResult = await bookController.update(
        createBookResult.id ?? '',
        {
          ...getTestCreateDto(createAuthorResult.id),
          id: createBookResult.id ?? '',
          description: 'Description updated',
        } as UpdateBookDto,
      );

      expect(updateBookResult).toBeTruthy();
      expect(updateBookResult).toMatchObject({
        id: createBookResult.id ?? '',
        title: 'The Mysterious Island',
        author: createAuthorResult,
        coverFileId: 'fixture-book.jpg',
        isForRent: false,
        price: 10,
        description: 'Description updated',
        isbn: '978-2-07-036002-4',
        editor: 'Penguin',
        genre: 'NOVEL',
        themes: ['TRAVEL_EXPLORATION', 'DREAM_IMAGINARY'],
        format: 'PAPERBACK',
        isPhysicalFormat: true,
        languageCode: 'fr',
        targetAudience: 'ENTERTAINMENT',
      });
    });
  });

  describe('When I call BookController.update without existing book id', () => {
    test('Then it should throw a NotFoundException', async () => {
      const createAuthorResult = await authorService.create({
        firstName: 'test',
        lastName: 'anotherTest',
      } as AuthorDto);

      let updateResult: BookDto | undefined = undefined;
      let error: any;

      try {
        updateResult = await bookController.update('nonexistant-id', {
          ...getTestCreateDto(createAuthorResult.id ?? ''),
        } as UpdateBookDto);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(updateResult).toBeUndefined();

      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    });
  });

  describe('When I call BookController.update without existing author id', () => {
    test('Then it should throw a NotFoundException', async () => {
      const createAuthorResult = await authorService.create({
        firstName: 'test',
        lastName: 'anotherTest',
      } as AuthorDto);

      expect(createAuthorResult.id).toBeDefined();

      const createBookResult = await bookController.create(
        getTestCreateDto(createAuthorResult.id),
      );

      let updateResult: BookDto | undefined = undefined;
      let error: any;

      try {
        updateResult = await bookController.update(createBookResult.id ?? '', {
          ...getTestCreateDto(),
          id: createBookResult.id ?? '',
          authorId: 'nonexistant-id',
        } as UpdateBookDto);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(updateResult).toBeUndefined();

      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    });
  });

  describe('When I call BookController.remove', () => {
    test('Then it should not throw', async () => {
      const createAuthorResult = await authorService.create({
        firstName: 'test',
        lastName: 'anotherTest',
      } as AuthorDto);

      const createBookResult = await bookController.create(
        getTestCreateDto(createAuthorResult.id),
      );

      let error: any;

      try {
        await bookController.remove(createBookResult.id ?? '');
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(error).toBeUndefined();
    });
  });

  describe('When I call BookController.remove without existing author id', () => {
    test('Then it should throw a NotFoundException', async () => {
      let error: any;

      try {
        await bookController.remove('inexistant-id');
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    });
  });

  // TODO : Implement test for search
});
