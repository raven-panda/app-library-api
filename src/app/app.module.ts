import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot(
      'mongodb://apiUser:ApiUserSecret87!@localhost:27017/ebrarydb',
    ),
  ],
})
export class AppModule {}
