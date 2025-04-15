import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleCategory } from '../vehicle-category/entities/vehicle-category.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,

    @InjectRepository(VehicleCategory)
    private readonly vehicleCategoryRepo: Repository<VehicleCategory>,
  ) {}

  async create(dto: CreateVehicleDto): Promise<Vehicle> {
    const category = await this.vehicleCategoryRepo.findOne({
      where: { id: dto.vehicleCategoryId },
    });

    if (!category) {
      throw new NotFoundException(`Vehicle category with ID ${dto.vehicleCategoryId} not found`);
    }

    const vehicle = this.vehicleRepo.create({
      ...dto,
      vehicleCategory: category,
    });

    return this.vehicleRepo.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepo.find({ relations: ['vehicleCategory'] });
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findOne({
      where: { id },
      relations: ['vehicleCategory'],
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(id: string, dto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException(`Vehicle with ID ${id} not found`);

    if (dto.vehicleCategoryId) {
      const category = await this.vehicleCategoryRepo.findOne({
        where: { id: dto.vehicleCategoryId },
      });
      if (!category) {
        throw new NotFoundException(`Vehicle category with ID ${dto.vehicleCategoryId} not found`);
      }
      vehicle.vehicleCategory = category;
    }

    Object.assign(vehicle, dto);
    return this.vehicleRepo.save(vehicle);
  }

  async remove(id: string): Promise<void> {
    const vehicle = await this.vehicleRepo.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException(`Vehicle with ID ${id} not found`);
    await this.vehicleRepo.remove(vehicle);
  }
}
