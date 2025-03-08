import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CustomFileInterceptor,
  ParseImageFilePipe,
} from '../../pipe/file.pipe';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly uploadService: FileService) {}

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const file = this.uploadService.findOne(id);
    file.pipe(res);
  }

  @Post()
  @UseInterceptors(CustomFileInterceptor)
  create(
    @UploadedFile(ParseImageFilePipe) file: Express.Multer.File,
  ) {
    return { id: file.filename };
  }

  @Post(':id')
  @UseInterceptors(CustomFileInterceptor)
  update(
    @Param('id') id: string,
    @UploadedFile(ParseImageFilePipe) file: Express.Multer.File,
  ) {
    this.uploadService.update(id, file.filename);
    return { id: file.filename };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.uploadService.remove(id);
  }
}
