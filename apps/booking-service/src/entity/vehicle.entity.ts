import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { VehicleCategory } from './vehicle-category.entity';
  
  @Entity('vehicle')
  export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => VehicleCategory, { eager: true })
    vehicleCategory: VehicleCategory;
  
    @Column({ length: 100 })
    vehicleName: string;
  
    @Column({ type: 'text', nullable: true })
    vehicleCategoryDescription: string;
  
    @Column({ default: false })
    isBooked: boolean;
  
    @Column({ length: 20 })
    carNumber: string;
  
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
  }
  