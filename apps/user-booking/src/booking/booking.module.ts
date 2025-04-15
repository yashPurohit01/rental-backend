import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

import { Booking } from './entities/booking.entity';
import { User } from '../user/entities/user.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { VehicleCategory } from '../vehicle-category/entities/vehicle-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Booking,
      User,
      Vehicle,
      VehicleCategory,
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService], // ✅ if used in other modules
})
export class BookingModule {}
