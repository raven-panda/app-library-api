import { IsNotEmpty, IsOptional } from 'class-validator';
import { BookGenreType } from '../../../type/bookgenre.type';
import { BookThemeType } from '../../../type/booktheme.type';
import { BookFormatType } from '../../../type/bookformat.type';
import { TargetAudienceType } from '../../../type/targetaudience.type';
import { LanguageCode } from 'iso-639-1';

export class BookDto {
  id?: string;
  @IsNotEmpty()
  isbn: string;
  @IsNotEmpty()
  title: string;
  // @IsNotEmpty()
  // author: IAuthor;
  /** @url */
  @IsNotEmpty()
  coverFileId: string;
  @IsNotEmpty()
  editor: string;
  @IsNotEmpty()
  genre: BookGenreType;
  @IsNotEmpty()
  theme: BookThemeType;
  @IsOptional()
  otherTheme: string | null = null;
  @IsNotEmpty()
  format: BookFormatType;
  @IsNotEmpty()
  isPhysicalFormat: boolean;
  @IsNotEmpty()
  languageCode: LanguageCode;
  @IsNotEmpty()
  targetAudience: TargetAudienceType;
  @IsOptional()
  reviews: number = 0;
  @IsOptional()
  averageRate: number = 0;
  @IsNotEmpty()
  isForRent: boolean;
  @IsNotEmpty()
  price: number;
}
