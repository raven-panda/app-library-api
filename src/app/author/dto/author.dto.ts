import { DtoAbstract } from '../../../type/abstracts/dto.abstract';
import { Author } from '../entities/author.entity';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { BookGlobalDto } from '../../book/dto/global-book.dto';

export class AuthorDto extends DtoAbstract<Author> {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsObject({ each: true })
  books?: BookGlobalDto[];

  fromEntity(entity: Author): AuthorDto {
    this.id = entity.id;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.books = entity.books?.map((b) => new BookGlobalDto().fromEntity(b));

    return this;
  }
}
