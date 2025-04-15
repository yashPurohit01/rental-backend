import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "../../booking/entities/booking.entity";


@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 20 ,nullable:false  })
    firstName: string;

    @Column({ length: 20 , nullable:false })
    lastName: string;


    @OneToMany(() => Booking , (booking) => booking.user , { cascade: true })
    bookings:Booking[];

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

}