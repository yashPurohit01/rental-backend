import { NestFactory } from '@nestjs/core';
import { UserBookingModule } from './user-booking.module';

async function bootstrap() {
  const app = await NestFactory.create(UserBookingModule);
  await app.listen(process.env.port ?? 8000);
}
bootstrap();
