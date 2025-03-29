import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorDto } from './dto/author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  public async findAll(): Promise<AuthorDto[]> {
    const authors = await this.authorRepository.find({
      relations: ['books'],
    });
    return authors.map((a) => new AuthorDto().fromEntity(a));
  }

  public async findOne(id: string): Promise<AuthorDto> {
    const result = await this.authorRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(`Author with id ${id} not found`);

    return new AuthorDto().fromEntity(result);
  }

  public async create(author: AuthorDto): Promise<AuthorDto> {
    const newEntity = new Author().fromDto(author, true);
    return new AuthorDto().fromEntity(
      await this.authorRepository.save(newEntity),
    );
  }

  public async update(id: string, author: AuthorDto): Promise<AuthorDto> {
    if (!(await this.authorRepository.existsBy({ id: id })))
      throw new NotFoundException(`Author with id ${id} not found`);

    author.id = id;
    const newEntity = new Author().fromDto(author, false);
    return new AuthorDto().fromEntity(
      await this.authorRepository.save(newEntity),
    );
  }

  public async remove(id: string): Promise<boolean> {
    if (!(await this.authorRepository.existsBy({ id })))
      throw new NotFoundException(`Author with id ${id} not found`);

    await this.authorRepository.delete({ id });
    return true;
  }
}
