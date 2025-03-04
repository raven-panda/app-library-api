import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://apiUser:ApiUserSecret87!@localhost:27017/ebrarydb',
    ),
  ],
})
export class AppModule {}
