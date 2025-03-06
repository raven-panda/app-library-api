import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';

@Injectable()
export class UploadService {
  public async findOne(id: string) {
    return Promise.resolve(`This action returns a #${id} upload`);
  }

  public async update(id: string, file: Express.Multer.File) {
    return Promise.resolve(
      `This action updates a #${id} upload and creates a new file ${file.filename}`,
    );
  }

  public async remove(id: string) {
    return Promise.resolve(`This action removes a #${id} upload`);
  }

  public unlinkFile(fileName: string) {
    try {
      unlinkSync(`./uploads/${fileName}`);
    } catch (error) {
      console.error(`Cannot unlink file ${fileName}`, error);
    }
  }
}
