import { DataSource } from 'typeorm';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { VehicleCategory, VehicleType } from '../vehicle-category/entities/vehicle-category.entity';

export const seedVehicleData = async (dataSource: DataSource) => {
  const vehicleCategoryRepo = dataSource.getRepository(VehicleCategory);
  const vehicleRepo = dataSource.getRepository(Vehicle);

  console.log('🌱 Seeding Vehicle Categories and Vehicles...');

  // 1. Define categories
  const categories = [
    {
      vehicleType: VehicleType.FOUR_WHEELER,
      vehicleCategory: 'Luxury Car',
      vehicleCategoryDescription: 'High-end luxury vehicles',
    },
    {
      vehicleType: VehicleType.TWO_WHEELER,
      vehicleCategory: 'Sports Bike',
      vehicleCategoryDescription: 'High-performance sports bikes',
    },
    {
      vehicleType: VehicleType.TWO_WHEELER,
      vehicleCategory: 'Commuter Bike',
      vehicleCategoryDescription: 'Fuel-efficient daily commute bikes',
    },
    {
      vehicleType: VehicleType.FOUR_WHEELER,
      vehicleCategory: 'SUV',
      vehicleCategoryDescription: 'Spacious sports utility vehicles',
    },
    {
      vehicleType: VehicleType.FOUR_WHEELER,
      vehicleCategory: 'Economy Car',
      vehicleCategoryDescription: 'Budget-friendly compact cars',
    },
  ];
  

  const savedCategories: VehicleCategory[] = [];

  // 2. Save categories if not already present
  for (const cat of categories) {
    let existing = await vehicleCategoryRepo.findOne({
      where: { vehicleCategory: cat.vehicleCategory },
    });

    if (!existing) {
      existing = await vehicleCategoryRepo.save(cat);
      console.log(`✅ Created category: ${cat.vehicleCategory}`);
    } else {
      console.log(`⚠️  Skipped existing category: ${cat.vehicleCategory}`);
    }

    savedCategories.push(existing);
  }

  // 3. Define vehicles under saved categories
  const vehicles = [
    {
      vehicleName: 'Audi A6',
      vehicleCategory: savedCategories[0],
      vehicleCategoryDescription: 'Luxury sedan with automatic transmission',
      carNumber: 'MH12AB1234',
      pricePerDay: 4500,
    },
    {
      vehicleName: 'Mercedes C-Class',
      vehicleCategory: savedCategories[0],
      vehicleCategoryDescription: 'German luxury car with premium features',
      carNumber: 'DL7CMB1234',
      pricePerDay: 5500,
    },
    {
      vehicleName: 'Yamaha R15',
      vehicleCategory: savedCategories[1],
      vehicleCategoryDescription: 'Sporty ride with great mileage',
      carNumber: 'DL8CA1234',
      pricePerDay: 900,
    },
    {
      vehicleName: 'KTM Duke 390',
      vehicleCategory: savedCategories[1],
      vehicleCategoryDescription: 'Aggressive styling with powerful engine',
      carNumber: 'MH14DUKE90',
      pricePerDay: 1100,
    },
    {
      vehicleName: 'Hero Splendor',
      vehicleCategory: savedCategories[2],
      vehicleCategoryDescription: 'Fuel-efficient commuter bike',
      carNumber: 'KA01COM9090',
      pricePerDay: 400,
    },
    {
      vehicleName: 'Bajaj Platina',
      vehicleCategory: savedCategories[2],
      vehicleCategoryDescription: 'Reliable and economical ride',
      carNumber: 'KA02PLT4040',
      pricePerDay: 350,
    },
    {
      vehicleName: 'Toyota Fortuner',
      vehicleCategory: savedCategories[3],
      vehicleCategoryDescription: 'Bold and powerful SUV with off-road capability',
      carNumber: 'DL4CSUV9999',
      pricePerDay: 4200,
    },
    {
      vehicleName: 'Hyundai Creta',
      vehicleCategory: savedCategories[3],
      vehicleCategoryDescription: 'Stylish and compact SUV',
      carNumber: 'MH04CRETA88',
      pricePerDay: 3000,
    },
    {
      vehicleName: 'Tata Nexon',
      vehicleCategory: savedCategories[3],
      vehicleCategoryDescription: 'Compact Indian SUV with safety features',
      carNumber: 'TN10NEXON1',
      pricePerDay: 2800,
    },
    {
      vehicleName: 'Maruti Swift',
      vehicleCategory: savedCategories[4],
      vehicleCategoryDescription: 'Popular hatchback for city driving',
      carNumber: 'GJ03SWFT11',
      pricePerDay: 1600,
    },
    {
      vehicleName: 'Hyundai i10',
      vehicleCategory: savedCategories[4],
      vehicleCategoryDescription: 'Compact economy car',
      carNumber: 'RJ14I10CAR',
      pricePerDay: 1500,
    },
    {
      vehicleName: 'Renault Kwid',
      vehicleCategory: savedCategories[4],
      vehicleCategoryDescription: 'Affordable city car with SUV styling',
      carNumber: 'CH01KWID33',
      pricePerDay: 1400,
    },
    {
      vehicleName: 'Tata Tiago',
      vehicleCategory: savedCategories[4],
      vehicleCategoryDescription: 'Budget car with modern features',
      carNumber: 'MP09TIAGO2',
      pricePerDay: 1450,
    },
    {
      vehicleName: 'Honda City',
      vehicleCategory: savedCategories[0],
      vehicleCategoryDescription: 'Mid-range luxury sedan',
      carNumber: 'UP32CITY77',
      pricePerDay: 3900,
    },
    {
      vehicleName: 'Skoda Superb',
      vehicleCategory: savedCategories[0],
      vehicleCategoryDescription: 'Premium executive sedan',
      carNumber: 'WB20SUPERB',
      pricePerDay: 4700,
    },
  ];

  for (const vehicle of vehicles) {
    const exists = await vehicleRepo.findOne({
      where: { carNumber: vehicle.carNumber },
    });

    if (!exists) {
      await vehicleRepo.save(vehicle);
      console.log(`🚗 Added vehicle: ${vehicle.vehicleName}`);
    } else {
      console.log(`⚠️  Vehicle already exists: ${vehicle.carNumber}`);
    }
  }

  console.log('✅ Seeding completed.\n');
};
