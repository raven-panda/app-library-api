import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends CreateBookDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
