import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { BookGenreType, BookGenreValues } from '../../../type/bookgenre.type';
import { BookThemeType, BookThemeValues } from '../../../type/booktheme.type';
import {
  TargetAudienceType,
  TargetAudienceValues,
} from '../../../type/targetaudience.type';
import { Transform } from 'class-transformer';

export class SearchBookDto {
  @IsString()
  @IsOptional()
  searchAll?: string;
  @IsString()
  @IsOptional()
  author?: string;
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  editor?: string;
  @IsString()
  @IsOptional()
  isbn?: string;
  @IsEnum(BookGenreValues)
  @IsOptional()
  genre?: BookGenreType;
  @Transform(({ value }) =>
    String(value)
      ?.split(',')
      .map((v) => String(v)),
  )
  @IsEnum(BookThemeValues, { each: true })
  @IsOptional()
  themes?: BookThemeType[];
  @IsEnum(TargetAudienceValues)
  @IsOptional()
  targetAudience?: TargetAudienceType;
  @IsString()
  @IsOptional()
  language?: string;
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  minReviewsNumber?: number;
  @Transform(({ value }) =>
    String(value)
      ?.split(',')
      .map((v) => Number(v)),
  )
  @IsInt({ each: true })
  @IsOptional()
  priceRange?: number[];
}
