import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config()

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.DBPORT, 10) || 5431,
  username: process.env.DBUSER || 'postgres',
  password: process.env.PASSWORD || 'test@123',
  database: process.env.DATABASE || 'vehicle-booking',
  logging: false,
  synchronize: true,
  autoLoadEntities: true,
};