import * as request from 'supertest';
import { BookDto } from '../src/app/book/dto/book.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app/app.module';
import { BookModule } from '../src/app/book/book.module';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';

describe('When I request book resource', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, BookModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Then [GET]/book should return a collection of all books', () => {
    return request(app.getHttpServer())
      .get('/book')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('Then [POST]/book with valid body should return 201', () => {
    const book: BookDto = {
      isbn: 'TestIsbn',
      title: 'TestTitle',
      coverFileId: 'TestAuthor',
      editor: 'TestEditor',
      genre: 'NOVEL',
      format: 'PDF',
      isForRent: false,
      isPhysicalFormat: false,
      languageCode: 'en',
      price: 0,
      targetAudience: 'COMMITTED_AND_SOCIAL',
      theme: 'DESTINY_FREEWILL',
      description: 'Test long description',
    };

    return request(app.getHttpServer()).post('/book').send(book).expect(201);
  });
});
