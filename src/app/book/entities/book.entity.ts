import { BookGenreType, BookGenreValues } from '../../../type/bookgenre.type';
import { BookThemeType } from '../../../type/booktheme.type';
import {
  BookFormatType,
  BookFormatValues,
} from '../../../type/bookformat.type';
import { LanguageCode } from 'iso-639-1';
import {
  TargetAudienceType,
  TargetAudienceValues,
} from '../../../type/targetaudience.type';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { bigintTransformer } from '../../utils/book.utils';
import { EntityAbstract } from '../../../type/abstracts/entity.abstract';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Author } from '../../author/entities/author.entity';

@Entity()
export class Book extends EntityAbstract<CreateBookDto, UpdateBookDto> {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  isbn: string;

  @Column()
  title: string;

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: 'CASCADE',
  })
  author: Author;

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

  @Column({ type: 'text' })
  themes: BookThemeType[];

  @Column({ type: 'text', nullable: true })
  otherThemes: string[] | null;

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

  public fromDto(book: CreateBookDto | UpdateBookDto, isCreate: boolean): Book {
    if (!isCreate && 'id' in book) this.id = book.id;

    this.title = book.title;
    this.coverFileId = book.coverFileId;
    this.isForRent = book.isForRent;
    this.description = book.description;
    this.price = book.price;
    this.isbn = book.isbn;
    this.editor = book.editor;
    this.genre = book.genre;
    this.themes = book.themes;
    this.otherThemes = book.otherThemes ?? null;
    this.format = book.format;
    this.isPhysicalFormat = book.isPhysicalFormat;
    this.languageCode = book.languageCode;
    this.targetAudience = book.targetAudience;

    return this;
  }
}
