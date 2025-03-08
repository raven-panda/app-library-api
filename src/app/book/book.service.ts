import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { BookDto } from './dto/book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { isPhysicalFormat } from '../utils/book.utils';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
  ) {}

  private toEntity(bookDto: CreateBookDto): Book {
    return {
      isbn: bookDto.isbn,
      averageRate: 0,
      coverFileId: bookDto.coverFileId,
      editor: bookDto.editor,
      format: bookDto.format,
      genre: bookDto.genre,
      isForRent: bookDto.isForRent,
      isPhysicalFormat: isPhysicalFormat(bookDto.format),
      languageCode: bookDto.languageCode,
      otherTheme: bookDto.otherTheme ?? null,
      price: bookDto.price,
      reviews: 0,
      targetAudience: bookDto.targetAudience,
      theme: bookDto.theme,
      title: bookDto.title,
      description: bookDto.description,
    };
  }

  private toDto(book: Book): BookDto {
    return {
      id: book.id,
      isbn: book.isbn,
      title: book.title,
      description: book.description,
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

  async create(createBookDto: CreateBookDto) {
    const book = this.toEntity(createBookDto);
    return this.toDto(await this.booksRepository.save(book));
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    if (!(await this.booksRepository.existsBy({ id: id })))
      throw new NotFoundException(`Book with id ${id} not found`);
    updateBookDto.id = id;
    const book = this.toEntity(updateBookDto);
    return this.toDto(await this.booksRepository.save(book));
  }

  async findAll() {
    const results = await this.booksRepository.find();
    return results.map((result) => this.toDto(result));
  }

  async findOne(id: string): Promise<BookDto> {
    const result = await this.booksRepository.findOneBy({ id: id });
    if (!result) throw new NotFoundException(`Book with id ${id} not found`);

    return this.toDto(result);
  }

  async remove(id: string): Promise<Book> {
    const result = await this.booksRepository.findOneBy({ id: id });
    if (!result) throw new NotFoundException(`Book with id ${id} not found`);

    return await this.booksRepository.remove(result);
  }
}
