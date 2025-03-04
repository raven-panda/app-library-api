import { IsNotEmpty } from 'class-validator';

export class BookDto {
  id?: string;
  @IsNotEmpty()
  title: string;
}
