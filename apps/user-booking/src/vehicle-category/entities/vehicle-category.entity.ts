import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

  
export enum VehicleType {
  TWO_WHEELER = 'TWO_WHEELER',
  FOUR_WHEELER = 'FOUR_WHEELER',
}
  
  @Entity('vehicle_category')
  export class VehicleCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'enum', enum: VehicleType, enumName: 'vehicle_type_enum' })
    vehicleType: VehicleType;
  
    @Column({ type: 'varchar', length: 100, unique: true })
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
  