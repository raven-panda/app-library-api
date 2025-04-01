import { Book } from '../entities/book.entity';
import { BookDto } from './book.dto';
import { BookGlobalDto } from './global-book.dto';
import { Author } from '../../author/entities/author.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './create-book.dto';
import { InvalidClassException } from '@nestjs/core/errors/exceptions';

describe('Given I transform Book entity to BookDto', () => {
  test('Then it should return a BookDto with the same values', () => {
    const bookEntity = new Book();
    bookEntity.id = 'testId';
    bookEntity.isbn = 'testIsbn';

    const bookDto = new BookDto().fromEntity(bookEntity);

    expect(bookDto).toMatchObject({
      id: 'testId',
      isbn: 'testIsbn',
    });
  });
});

describe('Given I transform Book entity to BookGlobalDto', () => {
  test('Then it should return a BookGlobalDto with the same values', () => {
    const bookEntity = new Book();
    bookEntity.id = 'testId';
    bookEntity.title = 'testTitle';

    bookEntity.author = new Author();
    bookEntity.author.id = 'testAuthorId';
    bookEntity.author.firstName = 'testFirstName';
    bookEntity.author.lastName = 'testLastName';

    const bookGlobalDto = new BookGlobalDto().fromEntity(bookEntity);

    expect(bookGlobalDto).toMatchObject({
      id: 'testId',
      title: 'testTitle',
      authorFullName: 'testFirstName testLastName',
    });
  });

  test('Then entity without id should throw a BadRequestException', () => {
    let bookGlobalDto: BookGlobalDto | undefined = undefined;
    let error: any;

    try {
      bookGlobalDto = new BookGlobalDto().fromEntity({} as Book);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error = e;
    }

    expect(bookGlobalDto).toBeUndefined();

    expect(error).toBeTruthy();
    expect(error).toBeInstanceOf(BadRequestException);
  });
});

describe('Given I try to transform Book entity to CreateBookDto', () => {
  test('Then it should throw a InvalidClassException', () => {
    let createBookDto: CreateBookDto | undefined = undefined;
    let error: any;

    try {
      createBookDto = new CreateBookDto().fromEntity({} as Book);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      error = e;
    }

    expect(createBookDto).toBeUndefined();

    expect(error).toBeTruthy();
    expect(error).toBeInstanceOf(InvalidClassException);
  });
});
