import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Vehicle } from './vehicle.entity';
  
  export enum VehicleType {
    CAR = 1,
    BIKE = 2,
    OTHER = 3,
  }
  
  @Entity('vehicle_category')
  export class VehicleCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'enum', enum: VehicleType })
    vehicleType: VehicleType;
  
    @Column({ type: 'varchar', length: 100 })
    vehicleCategory: string;
  
    @Column({ type: 'text', nullable: true })
    vehicleCategoryDescription: string;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleCategory)
    vehicles: Vehicle[];
  
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
  }
  