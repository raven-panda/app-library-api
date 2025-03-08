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
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {bigintTransformer} from "../../utils/book.utils";

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  isbn: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  // author: IAuthor;
  /** @url */
  @Column({ length: 64, nullable: true })
  coverFileId: string;

  @Column()
  editor: string;

  @Column({ type: 'enum', enum: BookGenreValues })
  genre: BookGenreType;

  @Column({ type: 'enum', enum: BookThemeValues })
  theme: BookThemeType;

  @Column({ type: 'varchar', nullable: true, length: 64 })
  otherTheme: string | null;

  @Column({ type: 'enum', enum: BookFormatValues })
  format: BookFormatType;

  @Column()
  isPhysicalFormat: boolean;

  @Column({ type: 'varchar', length: 4 })
  languageCode: LanguageCode;

  @Column({ type: 'enum', enum: TargetAudienceValues })
  targetAudience: TargetAudienceType;

  @Column({ type: 'bigint', default: 0, transformer: bigintTransformer })
  reviews: number;

  @Column({ default: 0 })
  averageRate: number;

  @Column()
  isForRent: boolean;

  @Column()
  price: number;
}
