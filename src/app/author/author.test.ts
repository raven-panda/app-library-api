import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { AuthorService } from './author.service';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorDto } from './dto/author.dto';
import { NotFoundException } from '@nestjs/common';

describe('Given I do action on Author', () => {
  let module: TestingModule;
  let authorController: AuthorController;
  let authorService: AuthorService;

  let authorRepository: Repository<Author>;

  beforeEach(async () => {
    jest.clearAllMocks();
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authorService = module.get<AuthorService>(AuthorService);
    authorController = module.get<AuthorController>(AuthorController);

    authorRepository = module.get<Repository<Author>>(
      getRepositoryToken(Author),
    );
  });

  afterEach(async () => {
    if (authorRepository) await authorRepository.query('DELETE FROM author');
    await module.close();
  });

  test('Then controller and service should be defined', () => {
    expect(authorController).toBeDefined();
    expect(authorService).toBeDefined();

    expect(authorRepository).toBeDefined();
  });

  describe('When I call AuthorController.findAll', () => {
    test('Then it should return a collection', async () => {
      const findAllResult = await authorController.findAll();

      expect(findAllResult).toBeTruthy();
      expect(Array.isArray(findAllResult)).toEqual(true);
    });
  });

  describe('When I call AuthorController.findOne', () => {
    test('Then it should return a BookDto', async () => {
      const createResult = await authorController.create({
        lastName: 'Test',
        firstName: 'Test',
      } as AuthorDto);

      const findOneResult = await authorController.findOne(
        createResult.id ?? '',
      );

      expect(findOneResult).toBeTruthy();
      expect(findOneResult).toHaveProperty('id');
      expect(findOneResult).toMatchObject({
        lastName: 'Test',
        firstName: 'Test',
      });
    });
  });

  describe('When I call AuthorController.findOne with non existant id', () => {
    test('Then it should throw a NotFoundException', async () => {
      let findOneResult: AuthorDto | undefined = undefined;
      let error: any;

      try {
        findOneResult = await authorController.findOne('inexistant-id');
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(findOneResult).toBeUndefined();
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    });
  });

  describe('When I call AuthorController.create', () => {
    test('Then it should return a BookDto', async () => {
      const createResult = await authorController.create({
        lastName: 'Test',
        firstName: 'Test',
      } as AuthorDto);

      expect(createResult).toBeTruthy();
      expect(createResult).toHaveProperty('id');
      expect(createResult).toMatchObject({
        lastName: 'Test',
        firstName: 'Test',
      });
    });
  });

  describe('When I call AuthorController.update', () => {
    test('Then it should return a BookDto', async () => {
      const createResult = await authorController.create({
        lastName: 'Test',
        firstName: 'Test',
      } as AuthorDto);

      const updateResult = await authorController.update(
        createResult.id ?? '',
        {
          id: createResult.id ?? '',
          lastName: 'TestUpdated',
          firstName: 'TestUpdated',
        } as AuthorDto,
      );

      expect(updateResult).toBeTruthy();
      expect(updateResult).toHaveProperty('id');
      expect(updateResult).toMatchObject({
        lastName: 'TestUpdated',
        firstName: 'TestUpdated',
      });
    });
  });

  describe('When I call AuthorController.update with non existant author id', () => {
    test('Then it should throw an NotFoundException', async () => {
      let updateResult: AuthorDto | undefined = undefined;
      let error: any;

      try {
        updateResult = await authorController.update('inexistant-id', {
          id: 'inexistant-id',
          lastName: 'TestUpdated',
          firstName: 'TestUpdated',
        } as AuthorDto);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(updateResult).toBeUndefined();
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    });
  });

  describe('When I call AuthorController.remove', () => {
    test('Then it should not throw an error', async () => {
      const createResult = await authorController.create({
        lastName: 'Test',
        firstName: 'Test',
      } as AuthorDto);

      let error: any;

      try {
        await authorController.remove(createResult.id ?? '');
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(error).toBeUndefined();
    });
  });

  describe('When I call AuthorController.remove with non existant author id', () => {
    test('Then it should throw an NotFoundException', async () => {
      let error: any;

      try {
        await authorController.remove('inexistant-id');
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error = e;
      }

      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(NotFoundException);
    });
  });
});
