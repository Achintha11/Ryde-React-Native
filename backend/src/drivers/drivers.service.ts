import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriversService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllDrivers() {
    return this.databaseService.driver.findMany();
  }

  async createDriver(createDriverDto: CreateDriverDto) {
    return this.databaseService.driver.create({
      data: createDriverDto,
    });
  }
}
