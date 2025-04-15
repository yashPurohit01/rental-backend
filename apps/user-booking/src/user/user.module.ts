import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { VehicleCategory } from '../vehicle-category/entities/vehicle-category.entity';
import { Booking } from '../booking/entities/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Vehicle,
      VehicleCategory,
      Booking,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // ✅ Export for use in other modules
})
export class UserModule {}
