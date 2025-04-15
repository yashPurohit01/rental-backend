import {
    IsUUID,
    IsDateString,
    IsEnum,
  } from 'class-validator';
  
  export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
  }
  
  export class CreateBookingDto {
    @IsUUID()
    userId: string;
  
    @IsUUID()
    vehicleId: string;
  
    @IsDateString()
    startDate: string;
  
    @IsDateString()
    endDate: string;
  
    @IsEnum(BookingStatus)
    status: BookingStatus;
  }
  