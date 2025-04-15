import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleCategoryService } from './vehicle-category.service';
import { VehicleCategoryController } from './vehicle-category.controller';

import { VehicleCategory } from './entities/vehicle-category.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Booking } from '../booking/entities/booking.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleCategory,
      Vehicle,
      Booking,
      User,
    ])
  ],
  controllers: [VehicleCategoryController],
  providers: [VehicleCategoryService],
  exports: [VehicleCategoryService,TypeOrmModule], // ✅ Exported for use in Vehicle or Booking modules
})
export class VehicleCategoryModule {}
