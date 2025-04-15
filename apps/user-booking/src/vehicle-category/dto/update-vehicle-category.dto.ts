import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleCategoryDto } from '../../vehicle-category/dto/create-vehicle-category.dto';

export class UpdateVehicleCategoryDto extends PartialType(CreateVehicleCategoryDto) {}
