import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthorModule } from './author/author.module';

const getEnvFilePath = () => {
  return process.env.NODE_ENV === 'production'
    ? ['.env.production', '.env']
    : process.env.NODE_ENV === 'test'
      ? [
          '.env.test.local',
          '.env.test',
          '.env.development.local',
          '.env.development',
          '.env',
        ]
      : ['.env.development.local', '.env.development', '.env'];
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT') ?? '3307'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthorModule,
    BookModule,
    FileModule,
  ],
})
export class AppModule {}
