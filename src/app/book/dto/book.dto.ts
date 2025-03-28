import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BookGenreType, BookGenreValues } from '../../../type/bookgenre.type';
import { BookThemeType, BookThemeValues } from '../../../type/booktheme.type';
import {
  BookFormatType,
  BookFormatValues,
} from '../../../type/bookformat.type';
import {
  TargetAudienceType,
  TargetAudienceValues,
} from '../../../type/targetaudience.type';
import { LanguageCode } from 'iso-639-1';
import { Transform } from 'class-transformer';
import {DtoAbstract} from "../../../type/abstracts/dto.abstract";
import {Book} from "../entities/book.entity";

export class BookDto extends DtoAbstract<Book> {
  @IsOptional()
  @IsString()
  id?: string;
  @IsNotEmpty()
  @IsString()
  isbn: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  // @IsNotEmpty()
  // author: IAuthor;
  /** @url */
  @IsNotEmpty()
  @IsString()
  coverFileId: string;
  @IsNotEmpty()
  @IsString()
  editor: string;
  @IsNotEmpty()
  @IsEnum(BookGenreValues)
  genre: BookGenreType;
  @IsNotEmpty()
  @Transform(({ value }) =>
    String(value)
      ?.split(',')
      .map((v) => String(v)),
  )
  @IsEnum(BookThemeValues, { each: true })
  themes: BookThemeType[];
  @IsOptional()
  @Transform(({ value }) =>
    String(value)
      ?.split(',')
      .map((v) => String(v)),
  )
  @IsString({ each: true })
  otherThemes?: string[] | null = null;
  @IsNotEmpty()
  @IsEnum(BookFormatValues)
  format: BookFormatType;
  @IsNotEmpty()
  @IsBoolean()
  isPhysicalFormat: boolean;
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(4)
  languageCode: LanguageCode;
  @IsNotEmpty()
  @IsEnum(TargetAudienceValues)
  targetAudience: TargetAudienceType;
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  reviews?: number = 0;
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  averageRate?: number = 0;
  @IsNotEmpty()
  @IsBoolean()
  isForRent: boolean;
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => isNaN(parseFloat(String(value))) ? 0 : parseFloat(String(value)))
  price: number;

  fromEntity(book: Book): BookDto {
    this.id = book.id;
    this.title = book.title;
    this.coverFileId = book.coverFileId;
    this.reviews = book.reviews;
    this.averageRate = book.averageRate;
    this.isForRent = book.isForRent;
    this.description = book.description;
    this.price = book.price;
    this.isbn = book.isbn;
    this.editor = book.editor;
    this.genre = book.genre;
    this.themes = book.themes;
    this.otherThemes = book.otherThemes;
    this.format = book.format;
    this.isPhysicalFormat = book.isPhysicalFormat;
    this.languageCode = book.languageCode;
    this.targetAudience = book.targetAudience;

    return this;
  }
}
