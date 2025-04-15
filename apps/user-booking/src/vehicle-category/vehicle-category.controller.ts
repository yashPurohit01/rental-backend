import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VehicleCategoryService } from './vehicle-category.service';
import { CreateVehicleCategoryDto } from './dto/create-vehicle-category.dto';
import { UpdateVehicleCategoryDto } from './dto/update-vehicle-category.dto';
import { VehicleType } from './entities/vehicle-category.entity';

@Controller('vehicle-category')
export class VehicleCategoryController {
  constructor(private readonly vehicleCategoryService: VehicleCategoryService) {}

  @Get('')
  check(@Query('vehicleType') vehicleType?: VehicleType) {
    return "THIS IS VEHICLE CATEGORY API!"
  }

  @Post('/add-new-category')
  create(@Body() createVehicleCategoryDto: CreateVehicleCategoryDto) {
    return this.vehicleCategoryService.create(createVehicleCategoryDto);
  }


  @Get('/get-all-category')
  findAll(@Query('vehicleType') vehicleType?: VehicleType) {
    return this.vehicleCategoryService.findAll(vehicleType);
  }

  @Get('/get-categroy-detail/:id')
  findOne(@Param('id') id: string) {
    return this.vehicleCategoryService.findOne(id);
  }

  @Patch('/update-categroy-detail/:id')
  update(@Param('id') id: string, @Body() updateVehicleCategoryDto: UpdateVehicleCategoryDto) {
    return this.vehicleCategoryService.update(id, updateVehicleCategoryDto);
  }

  @Delete('/delete-categroy/:id')
  remove(@Param('id') id: string) {
    return this.vehicleCategoryService.remove(id);
  }
}
