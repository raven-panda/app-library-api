import { IsNotEmpty } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends CreateBookDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  oldCoverFileId: string;
}
