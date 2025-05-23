import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import { BookModule } from '../src/app/book/book.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { CreateBookDto } from '../src/app/book/dto/create-book.dto';
import { BookDto } from '../src/app/book/dto/book.dto';
import { isGivenFormatPhysical } from '../src/app/utils/book.utils';

describe('When I request book resource', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, BookModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('Then [GET]/book/search should return a collection of all books', () => {
    return request(app.getHttpServer())
      .get('/book/search')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  test('Then [POST]/book with valid body should return 201 and data returned should be valid', () => {
    const bookToCreate: CreateBookDto = {
      isbn: 'TestIsbn',
      title: 'TestTitle',
      editor: 'TestEditor',
      authorId: '2fd73c2e-ca36-4313-a961-4980e5587533',
      coverFileId: 'test-file.jpeg',
      genre: 'NOVEL',
      format: 'PAPERBACK',
      isForRent: true,
      isPhysicalFormat: false,
      languageCode: 'en',
      price: 0,
      targetAudience: 'COMMITTED_AND_SOCIAL',
      themes: ['DESTINY_FREEWILL'],
      description: 'Test long description',

      fromEntity: (): CreateBookDto => bookToCreate,
    };

    bookToCreate.isPhysicalFormat = isGivenFormatPhysical(bookToCreate.format);

    return request(app.getHttpServer())
      .post('/book')
      .send(bookToCreate)
      .expect(201)
      .expect((res) => {
        expect(res.body).toBeTruthy();
        const resDto: BookDto = res.body as BookDto;

        expect(resDto.languageCode).toEqual(bookToCreate.languageCode);
        expect(resDto.targetAudience).toEqual(bookToCreate.targetAudience);
        expect(resDto.format).toEqual(bookToCreate.format);
        expect(resDto.genre).toEqual(bookToCreate.genre);
        expect(resDto.themes).toEqual(bookToCreate.themes);
        expect(resDto.description).toEqual(bookToCreate.description);
        expect(resDto.editor).toEqual(bookToCreate.editor);
        expect(resDto.title).toEqual(bookToCreate.title);
        expect(resDto.isbn).toEqual(bookToCreate.isbn);
        expect(resDto.price).toEqual(bookToCreate.price);
        expect(resDto.isPhysicalFormat).toEqual(bookToCreate.isPhysicalFormat);
        expect(resDto.isForRent).toEqual(bookToCreate.isForRent);
        expect(resDto.coverFileId).toEqual(bookToCreate.coverFileId);

        expect(resDto.id).toBeTruthy();
        expect(resDto.reviews).toEqual(0);
        expect(resDto.averageRate).toEqual(0);
      });
  });

  test('Then [POST]/book with invalid body should return 400', () => {
    return request(app.getHttpServer()).post('/book').send({}).expect(400);
  });
});
