import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { VehicleCategory } from '../../vehicle-category/entities/vehicle-category.entity';
import { Booking } from '../../booking/entities/booking.entity';

  
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
  
    // @Column({ default: false })
    // isBooked: boolean;

    @OneToMany(() => Booking , (booking) => booking.vehicle)
    bookings:Booking[];
  
    @Column({ length: 20 })
    carNumber: string;

    @Column({ type: 'decimal', nullable: true })
    pricePerDay: number;
  
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
  }
  