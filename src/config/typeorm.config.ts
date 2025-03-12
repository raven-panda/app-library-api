import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

config();

const configService = new ConfigService();
configService.setEnvFilePaths([
  '.env.test.local',
  '.env.test',
  '.env.development.local',
  '.env.development',
  '.env',
]);

const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: configService.get<string>('DATABASE_HOST'),
    port: parseInt(configService.get<string>('DATABASE_PORT') ?? '3307'),
    username: configService.get<string>('MYSQL_USER'),
    password: configService.get<string>('MYSQL_PASSWORD'),
    database: configService.get<string>('MYSQL_DATABASE'),
    entities: entities,
    synchronize: true,
  });

export default TypeORMMySqlTestingModule;
