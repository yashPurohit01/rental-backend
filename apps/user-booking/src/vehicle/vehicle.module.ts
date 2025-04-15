import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleCategory } from '../vehicle-category/entities/vehicle-category.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      User,
      Booking,
      Vehicle,
      VehicleCategory,
   ]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService,TypeOrmModule],
})
export class VehicleModule {}
