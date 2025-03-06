import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import {
  CustomFileInterceptor,
  ParseImageFilePipe,
} from '../../pipe/file.pipe';

@Controller('file')
export class UploadController {
  constructor() {}

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!existsSync(join(process.cwd(), 'uploads', id)))
      throw new NotFoundException(`File ${id} to delete not found`);

    try {
      const file = createReadStream(join(process.cwd(), 'uploads', id));
      file.pipe(res);
    } catch (e) {
      console.error('Error while loading file', e);
      throw new InternalServerErrorException('Error while loading file');
    }
  }

  @Post(':id')
  @UseInterceptors(CustomFileInterceptor)
  update(
    @Param('id') id: string,
    @UploadedFile(ParseImageFilePipe) file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!existsSync(join(process.cwd(), 'uploads', id)))
      throw new NotFoundException(`File ${id} to delete not found`);

    try {
      unlinkSync(join(process.cwd(), 'uploads', id));
      file.stream.pipe(res);
    } catch (e) {
      console.error('Error while removing previous file', e);
      throw new InternalServerErrorException(
        'Error while removing previous file',
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
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
