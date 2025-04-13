import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { VehicleType } from '../entity/vehicle-category.entity';


export class CreateVehicleCategoryDto {
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  vehicleCategory: string;

  @IsString()
  @IsOptional()
  vehicleCategoryDescription?: string;
}
