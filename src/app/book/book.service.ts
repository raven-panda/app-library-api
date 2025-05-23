import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { BookDto } from './dto/book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { buildBookSearch } from '../utils/book.utils';
import { UpdateBookDto } from './dto/update-book.dto';
import { SearchBookDto } from './dto/search-book.dto';
import { BookGlobalDto } from './dto/global-book.dto';
import { Author } from '../author/entities/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookDto> {
    const author = await this.authorRepository.findOneBy({
      id: createBookDto.authorId,
    });
    if (!author)
      throw new NotFoundException(
        `Author with id ${createBookDto.authorId} not found`,
      );

    const book = new Book().fromDto(createBookDto, true);
    book.author = author;
    return new BookDto().fromEntity(await this.booksRepository.save(book));
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookDto> {
    if (!(await this.booksRepository.existsBy({ id: id })))
      throw new NotFoundException(`Book with id ${id} not found`);

    const author = await this.authorRepository.findOneBy({
      id: updateBookDto.authorId,
    });
    if (!author)
      throw new NotFoundException(
        `Author with id ${updateBookDto.authorId} not found`,
      );
    updateBookDto.id = id;
    const book = new Book().fromDto(updateBookDto, false);
    book.author = author;
    return new BookDto().fromEntity(await this.booksRepository.save(book));
  }

  async search(payload: SearchBookDto): Promise<BookGlobalDto[]> {
    const qb = this.booksRepository.createQueryBuilder('book');
    const results = await buildBookSearch(qb, payload);
    return results.map((result) => new BookGlobalDto().fromEntity(result));
  }

  async findOne(id: string): Promise<BookDto> {
    const result = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!result) throw new NotFoundException(`Book with id ${id} not found`);
    return new BookDto().fromEntity(result);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.booksRepository.findOneBy({ id: id });
    if (!result) throw new NotFoundException(`Book with id ${id} not found`);
    await this.booksRepository.delete(id);
    return true;
  }
}
