import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';
import { VehicleCategory } from './entities/vehicle-category.entity';

@Injectable()
export class VehicleCategoryService {
  constructor(
    @InjectRepository(VehicleCategory)
    private readonly vehicleCategoryRepo: Repository<VehicleCategory>,
  ) {}

  async create(dto: CreateVehicleCategoryDto): Promise<VehicleCategory> {
    const newCategory = this.vehicleCategoryRepo.create(dto);
    return this.vehicleCategoryRepo.save(newCategory);
  }

  async findAll(): Promise<VehicleCategory[]> {
    return this.vehicleCategoryRepo.find({ relations: ['vehicles'] });
  }

  async findOne(id: string): Promise<VehicleCategory> {
    const category = await this.vehicleCategoryRepo.findOne({
      where: { id },
      relations: ['vehicles'],
    });

    if (!category) {
      throw new NotFoundException(`Vehicle category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, dto: UpdateVehicleCategoryDto): Promise<VehicleCategory> {
    const category = await this.vehicleCategoryRepo.preload({
      id,
      ...dto,
    });

    if (!category) {
      throw new NotFoundException(`Vehicle category with ID ${id} not found`);
    }

    return this.vehicleCategoryRepo.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.vehicleCategoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Vehicle category with ID ${id} not found`);
    }

    await this.vehicleCategoryRepo.remove(category);
  }
}
