import { DtoAbstract } from '../../../type/abstracts/dto.abstract';
import { Author } from '../entities/author.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthorGlobalDto extends DtoAbstract<Author> {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  fromEntity(entity: Author): AuthorGlobalDto {
    this.id = entity.id;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;

    return this;
  }
}
