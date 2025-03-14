import { BookFormatType } from '../../type/bookformat.type';
import { ValueTransformer } from 'typeorm';
import { SearchBookDto } from '../book/dto/search-book.dto';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { Book } from '../book/entities/book.entity';

export function isGivenFormatPhysical(format: BookFormatType) {
  return format === 'PAPERBACK' || format === 'POCKET';
}

export const bigintTransformer: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string | number) => Number(value),
};

/** @todo: implement author parameter */
export async function buildBookSearch(
  qb: SelectQueryBuilder<Book>,
  payload: SearchBookDto,
) {
  if (payload.searchAll) processSearchAll(qb, payload.searchAll);
  if (payload.title)
    qb.andWhere('book.title LIKE :title', { title: `%${payload.title}%` });
  if (payload.editor)
    qb.andWhere('book.editor LIKE :editor', { editor: `%${payload.editor}%` });
  if (payload.isbn)
    qb.andWhere('book.isbn LIKE :isbn', { isbn: `%${payload.isbn}%` });
  if (payload.genre)
    qb.andWhere('book.genre LIKE :genre', { genre: `%${payload.genre}%` });
  if (payload.language)
    qb.andWhere('book.languageCode LIKE :language', {
      language: `%${payload.language}%`,
    });
  if (payload.theme)
    qb.andWhere('book.theme LIKE :theme', { theme: `%${payload.theme}%` });
  if (payload.targetAudience)
    qb.andWhere('book.targetAudience LIKE :targetAudience', {
      targetAudience: `%${payload.targetAudience}%`,
    });

  if (payload.minReviewsNumber !== undefined)
    qb.andWhere('book.reviews >= :minReviewsNumber', {
      minReviewsNumber: payload.minReviewsNumber,
    });

  if (payload.priceRange)
    qb.andWhere('book.price BETWEEN :minPrice AND :maxPrice', {
      minPrice: payload.priceRange[0],
      maxPrice: payload.priceRange[1],
    });

  return await qb.select([
    'book.id',
    'book.title',
    'book.coverFileId',
    'book.reviews',
    'book.editor',
    'book.averageRate',
    'book.isForRent',
    'book.price'
  ]).getMany();
}

/** @todo: implement author parameter */
const processSearchAll = (
  qb: SelectQueryBuilder<Book>,
  searchString: string,
) => {
  const searchFields = [
    'book.title',
    'book.editor',
    'book.isbn',
  ];

  searchFields.forEach((field, index) => {
    if (index === 0) {
      qb.where(`${field} LIKE :query`, { query: `%${searchString}%` });
    } else {
      qb.orWhere(`${field} LIKE :query`, { query: `%${searchString}%` });
    }
  });

  /*qb.leftJoinAndSelect("book.author", "author")
    .orWhere("LOWER(CONCAT(author.firstName, ' ', author.lastName)) LIKE LOWER(:query)", { query: `%${searchString}%` });*/
};
