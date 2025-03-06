import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import {
  CustomFileInterceptor,
  ParseImageFilePipe,
} from '../../pipe/file.pipe';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(CustomFileInterceptor)
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile(ParseImageFilePipe) file: Express.Multer.File,
  ) {
    return await this.bookService.create(createBookDto, file.filename);
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bookService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile(ParseImageFilePipe) file: Express.Multer.File,
  ) {
    return await this.bookService.update(id, updateBookDto, file.filename);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bookService.remove(id);
  }
}
