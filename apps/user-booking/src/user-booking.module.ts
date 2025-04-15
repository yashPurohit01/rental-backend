import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../typeorm.config';

import { VehicleCategoryModule } from './vehicle-category/vehicle-category.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BookingModule, 
    VehicleModule,
    VehicleCategoryModule,
    UserModule,
  ]
})
export class UserBookingModule {}
