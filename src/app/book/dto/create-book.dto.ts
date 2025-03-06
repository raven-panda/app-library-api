import { IsNotEmpty, IsOptional } from 'class-validator';
import { BookGenreType } from '../../../type/bookgenre.type';
import { BookThemeType } from '../../../type/booktheme.type';
import { BookFormatType } from '../../../type/bookformat.type';
import { LanguageCode } from 'iso-639-1';
import { TargetAudienceType } from '../../../type/targetaudience.type';

export class CreateBookDto {
  @IsNotEmpty()
  isbn: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  // @IsNotEmpty()
  // author: IAuthor;
  @IsNotEmpty()
  editor: string;
  @IsNotEmpty()
  genre: BookGenreType;
  @IsNotEmpty()
  theme: BookThemeType;
  @IsOptional()
  otherTheme?: string;
  @IsNotEmpty()
  format: BookFormatType;
  @IsNotEmpty()
  isPhysicalFormat: boolean;
  @IsNotEmpty()
  languageCode: LanguageCode;
  @IsNotEmpty()
  targetAudience: TargetAudienceType;
  @IsNotEmpty()
  isForRent: boolean;
  @IsNotEmpty()
  price: number;
}
