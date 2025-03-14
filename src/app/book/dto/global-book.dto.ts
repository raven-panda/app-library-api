import { DtoAbstract } from '../../../type/abstracts/dto.abstract';
import { Book } from '../entities/book.entity';
import { BadRequestException } from '@nestjs/common';

export class BookGlobalDto extends DtoAbstract<Book> {
  id: string;
  title: string;
  authorFullName: string;
  editor: string;
  /** @url */
  coverFileId: string;
  reviews: number;
  averageRate: number;
  isForRent: boolean;
  price: number;

  fromEntity(book: Book): BookGlobalDto {
    if (!book.id) throw new BadRequestException('Book must have an id');

    this.id = book.id;
    this.title = book.title;
    this.authorFullName = '';
    this.editor = book.editor;
    this.coverFileId = book.coverFileId;
    this.reviews = book.reviews;
    this.averageRate = book.averageRate;
    this.isForRent = book.isForRent;
    this.price = book.price;

    return this;
  }
}
