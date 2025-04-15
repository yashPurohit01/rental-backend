import {
    IsUUID,
    IsString,
    IsOptional,
    IsNumber,
    MaxLength,
  } from 'class-validator';
  
  export class CreateVehicleDto {
    @IsUUID()
    vehicleCategoryId: string;
  
    @IsString()
    @MaxLength(100)
    vehicleName: string;
  
    @IsOptional()
    @IsString()
    vehicleCategoryDescription?: string;
  
    @IsString()
    @MaxLength(20)
    carNumber: string;
  
    @IsOptional()
    @IsNumber()
    pricePerDay?: number;
  }
  