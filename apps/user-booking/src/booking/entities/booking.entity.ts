import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Vehicle } from "../../vehicle/entities/vehicle.entity";


@Entity()
export class Booking {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.bookings, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User

    @Column({ nullable: true })
    userId: string;

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings, { nullable: false })
    @JoinColumn({ name: 'vehicleId' })
    vehicle: Vehicle

    @Column({ nullable: true })
    vehicleId: string;

    @Column({ type: 'timestamp with time zone' })
    startDate: Date;

    @Column({ type: 'timestamp with time zone' })
    endDate: Date;

    @Column({ default: 'pending' })
    status: 'pending' | 'confirmed' | 'cancelled';

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
    deletedAt?: Date;
}
