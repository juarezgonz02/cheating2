import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }
}
