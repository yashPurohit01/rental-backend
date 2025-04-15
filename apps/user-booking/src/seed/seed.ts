import { DataSource, DataSourceOptions } from 'typeorm';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { VehicleCategory } from '../vehicle-category/entities/vehicle-category.entity';
import { seedVehicleData } from './vehicle.seeder';
import { Booking } from '../booking/entities/booking.entity';
import { User } from '../user/entities/user.entity';


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.DBPORT, 10) || 5431,
  username: process.env.DBUSER || 'postgres',
  password: process.env.PASSWORD || 'test@123',
  database: process.env.DATABASE || 'vehicle-booking',
  logging: false,
  synchronize: true,
  entities: [Vehicle, VehicleCategory,Booking,User],
};

const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize().then(async () => {
  await seedVehicleData(dataSource);
  await dataSource.destroy();
});
