import { AuthorDto } from '../dto/author.dto';
import { Author } from './author.entity';

describe('Given I transform AuthorDto to Author entity', () => {
  describe('When I specify it is a create request', () => {
    test('Then it should return a Author entity with the same values and without an id', () => {
      const authorDto = new AuthorDto();
      authorDto.id = 'testId';
      authorDto.firstName = 'testFirstName';
      authorDto.lastName = 'testFirstName';

      const authorEntity = new Author().fromDto(authorDto, true);

      expect(authorEntity).toMatchObject({
        firstName: 'testFirstName',
        lastName: 'testFirstName',
      });
      expect(authorEntity.id).toBeUndefined();
    });
  });

  describe('When I specify it is not a create request', () => {
    test('Then it should return a Author entity with the same values', () => {
      const authorDto = new AuthorDto();
      authorDto.id = 'testId';
      authorDto.firstName = 'testFirstName';
      authorDto.lastName = 'testFirstName';

      const authorEntity = new Author().fromDto(authorDto, false);

      expect(authorEntity).toMatchObject({
        id: 'testId',
        firstName: 'testFirstName',
        lastName: 'testFirstName',
      });
    });
  });
});
