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

export class BookDto {
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
  @IsEnum(BookThemeValues)
  theme: BookThemeType;
  @IsOptional()
  @IsString()
  otherTheme?: string | null = null;
  @IsNotEmpty()
  @IsEnum(BookFormatValues)
  format: BookFormatType;
  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
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
  @Transform(({ value }) => value === 'true' || value === true)
  isForRent: boolean;
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => isNaN(parseFloat(String(value))) ? 0 : parseFloat(String(value)))
  price: number;
}
