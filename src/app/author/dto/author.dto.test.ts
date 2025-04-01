import { Author } from '../entities/author.entity';
import { AuthorDto } from './author.dto';
import { Book } from '../../book/entities/book.entity';
import { AuthorGlobalDto } from './global-author.dto';

describe('Given I transform Author entity to AuthorDto', () => {
  test('Then it should return a AuthorDto with the same values', () => {
    const authorEntity = new Author();
    authorEntity.id = 'testId';
    authorEntity.firstName = 'testFirstName';
    authorEntity.lastName = 'testFirstName';
    authorEntity.books = [
      {
        id: 'testBookId',
      } as Book,
    ];

    const authorDto = new AuthorDto().fromEntity(authorEntity);

    expect(authorDto).toMatchObject({
      id: 'testId',
      firstName: 'testFirstName',
      lastName: 'testFirstName',
      books: [
        {
          id: 'testBookId',
        },
      ],
    });
  });
});

describe('Given I transform Author entity to AuthorGlobalDto', () => {
  test('Then it should return a AuthorGlobalDto with the same values', () => {
    const authorEntity = new Author();
    authorEntity.id = 'testId';
    authorEntity.firstName = 'testFirstName';
    authorEntity.lastName = 'testFirstName';
    authorEntity.books = [
      {
        id: 'testBookId',
      } as Book,
    ];

    const authorDto = new AuthorGlobalDto().fromEntity(authorEntity);

    expect(authorDto).toMatchObject({
      id: 'testId',
      firstName: 'testFirstName',
      lastName: 'testFirstName',
    });
  });
});
