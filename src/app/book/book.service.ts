import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';
import { Model } from 'mongoose';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  protected toReturnDto(book: Book): BookDto {
    return {
      id: book.id,
      title: book.title,
    };
  }

  async create(createBookDto: BookDto) {
    const newBook = new this.bookModel({
      title: createBookDto.title,
    });
    return this.toReturnDto(await newBook.save());
  }

  async findAll() {
    const results = await this.bookModel.find().exec();
    return results.map((result) => this.toReturnDto(result));
  }

  async findOne(id: string) {
    const result = await this.bookModel.findById(id).exec();
    if (!result) throw new NotFoundException(`Book with id ${id} not found`);

    return this.toReturnDto(result);
  }

  async update(id: string, updateBookDto: BookDto) {
    return await this.bookModel.findByIdAndUpdate(id, updateBookDto).exec();
  }

  async remove(id: string) {
    return await this.bookModel.findByIdAndDelete(id).exec();
  }
}
