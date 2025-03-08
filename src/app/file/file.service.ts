import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { ReadStream } from 'fs';

@Injectable()
export class FileService {
  findOne(id: string): ReadStream {
    if (!existsSync(join(process.cwd(), 'uploads', id)))
      throw new NotFoundException(`File ${id} to delete not found`);

    try {
      return createReadStream(join(process.cwd(), 'uploads', id));
    } catch (e) {
      console.error('Error while loading file', e);
      throw new InternalServerErrorException('Error while loading file');
    }
  }

  update(id: string, newId: string) {
    if (!existsSync(join(process.cwd(), 'uploads', id)))
      throw new NotFoundException(`File ${id} to delete not found`);

    try {
      unlinkSync(join(process.cwd(), 'uploads', id));
      return createReadStream(join(process.cwd(), 'uploads', newId));
    } catch (e) {
      console.error('Error while updating file', e);
      throw new InternalServerErrorException(
        'Error while updating file',
      );
    }
  }

  remove(id: string): void {
    if (!existsSync(join(process.cwd(), 'uploads', id)))
      throw new NotFoundException(`File ${id} not found`);

    try {
      unlinkSync(join(process.cwd(), 'uploads', id));
    } catch (e) {
      console.error('Error while removing file', e);
      throw new InternalServerErrorException('Error while removing file');
    }
  }
}
