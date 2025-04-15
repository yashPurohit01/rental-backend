import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking-dto';
import { UpdateBookingDto } from './dto/update-booking-dto';
import { User } from '../user/entities/user.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
  ) { }

  async create(dto: CreateBookingDto): Promise<Booking> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    const vehicle = await this.vehicleRepo.findOne({ where: { id: dto.vehicleId } });

    if (!user) throw new NotFoundException('User not found');
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    if (new Date(dto.startDate) >= new Date(dto.endDate)) {
      throw new BadRequestException('End date must be after start date');
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    const overlapping = await this.bookingRepo.findOne({
      where: {
        vehicle: { id: dto.vehicleId },
        startDate: LessThan(endDate),
        endDate: MoreThan(startDate),
      },
    });

    if (overlapping) {
      throw new BadRequestException('Vehicle already booked for selected dates');
    }

    const booking = this.bookingRepo.create({
      ...dto,
      user,
      vehicle,
    });

    return await this.bookingRepo.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepo.find({
      relations: ['user', 'vehicle'],
    });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['user', 'vehicle'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async update(id: string, dto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepo.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    Object.assign(booking, dto);
    return this.bookingRepo.save(booking);
  }

  async remove(id: string): Promise<void> {
    const booking = await this.bookingRepo.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    await this.bookingRepo.remove(booking);
  }
}
