import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const IMAGE_MIME_REGEX = /image\/(jpeg|jpg|png|webp)$/;

export const ParseImageFilePipe = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: IMAGE_MIME_REGEX,
  })
  .addMaxSizeValidator({
    maxSize: 2 * 1024 * 1024,
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });

export const CustomFileInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(
        null,
        file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
      );
    },
  }),
});
