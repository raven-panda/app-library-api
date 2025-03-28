import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookGenreType, BookGenreValues } from '../../../type/bookgenre.type';
import { BookThemeType, BookThemeValues } from '../../../type/booktheme.type';
import {
  BookFormatType,
  BookFormatValues,
} from '../../../type/bookformat.type';
import { LanguageCode } from 'iso-639-1';
import {
  TargetAudienceType,
  TargetAudienceValues,
} from '../../../type/targetaudience.type';
import { Transform } from 'class-transformer';
import {DtoAbstract} from "../../../type/abstracts/dto.abstract";
import {Book} from "../entities/book.entity";
import {InvalidClassException} from "@nestjs/core/errors/exceptions";

export class CreateBookDto extends DtoAbstract<Book> {
  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

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
  @IsString()
  otherThemes?: string[];

  @IsNotEmpty()
  @IsEnum(BookFormatValues)
  format: BookFormatType;

  @IsNotEmpty()
  @IsBoolean()
  isPhysicalFormat: boolean;

  @IsNotEmpty()
  @IsString()
  languageCode: LanguageCode;

  @IsNotEmpty()
  @IsEnum(TargetAudienceValues)
  targetAudience: TargetAudienceType;

  @IsNotEmpty()
  @IsBoolean()
  isForRent: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) =>
    isNaN(parseFloat(String(value))) ? 0 : parseFloat(String(value)),
  )
  price: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fromEntity(entity: Book): CreateBookDto {
    throw new InvalidClassException("This DTO doesn't support this method.");
  }

}
