import { Book } from './book.entity';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

describe('Given I transform BookDto to a Book entity', () => {
  describe('When I specify it is a create request', () => {
    test('Then it should return a Book entity with the same values and without an id', () => {
      const bookDto = new CreateBookDto();
      bookDto.title = 'testTitle';

      const bookEntity = new Book().fromDto(bookDto, true);

      expect(bookEntity.id).toBeUndefined();
      expect(bookEntity).toMatchObject({
        title: 'testTitle',
      });
    });
  });

  describe('When I specify it is not a create request', () => {
    test('Then it should return a Book entity with the same values', () => {
      const bookDto = new UpdateBookDto();
      bookDto.id = 'testId';
      bookDto.title = 'testTitle';

      const bookEntity = new Book().fromDto(bookDto, false);

      expect(bookEntity).toMatchObject({
        id: 'testId',
        title: 'testTitle',
      });
    });
  });
});
