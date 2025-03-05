import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { BookDto } from './dto/book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
  ) {}

  private toEntity(book: BookDto): Book {
    return {
      isbn: book.isbn,
      title: book.title,
      // author: IAuthor,
      coverFileId: book.coverFileId,
      editor: book.editor,
      genre: book.genre,
      theme: book.theme,
      otherTheme: book.otherTheme,
      format: book.format,
      isPhysicalFormat: book.isPhysicalFormat,
      languageCode: book.languageCode,
      targetAudience: book.targetAudience,
      reviews: book.reviews,
      averageRate: book.averageRate,
      isForRent: book.isForRent,
      price: book.price,
    };
  }

  private toReturnDto(book: Book): BookDto {
    return {
      id: book.id,
      isbn: book.isbn,
      title: book.title,
      // author: IAuthor,
      coverFileId: book.coverFileId,
      editor: book.editor,
      genre: book.genre,
      theme: book.theme,
      otherTheme: book.otherTheme,
      format: book.format,
      isPhysicalFormat: book.isPhysicalFormat,
      languageCode: book.languageCode,
      targetAudience: book.targetAudience,
      reviews: book.reviews,
      averageRate: book.averageRate,
      isForRent: book.isForRent,
      price: book.price,
    };
  }

  async create(createBookDto: BookDto) {
    const book = this.booksRepository.create(this.toEntity(createBookDto));
    await this.booksRepository.save(book);
  }

  async findAll() {
    const results = await this.booksRepository.find();
    return results.map((result) => this.toReturnDto(result));
  }

  async findOne(id: string) {
    const result = await this.booksRepository.findOneBy({ id: id });
    if (!result) throw new NotFoundException(`Book with id ${id} not found`);

    return this.toReturnDto(result);
  }

  async remove(id: string) {
    if (!(await this.booksRepository.existsBy({ id })))
      throw new NotFoundException(`Book with id ${id} not found`);

    return await this.booksRepository.delete(id);
  }
}
