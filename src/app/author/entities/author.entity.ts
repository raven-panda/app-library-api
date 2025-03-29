import { EntityAbstract } from '../../../type/abstracts/entity.abstract';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorDto } from '../dto/author.dto';
import { Book } from '../../book/entities/book.entity';

@Entity()
export class Author extends EntityAbstract<AuthorDto, AuthorDto> {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  fromDto(entity: AuthorDto, isCreate: boolean): Author {
    if (!isCreate) this.id = entity.id;

    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    return this;
  }
}
