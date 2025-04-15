import { NestFactory } from '@nestjs/core';
import { UserBookingModule } from './user-booking.module';

async function bootstrap() {
  const app = await NestFactory.create(UserBookingModule);
  const options = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.port ?? 8000);
}
bootstrap();
