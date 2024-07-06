import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('cities')
@ApiBearerAuth()
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener lista de ciudades' })
  @ApiResponse({ status: 200, description: 'Lista de ciudades devuelta exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAll() {
    return this.citiesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una ciudad por ID' })
  @ApiParam({ name: 'id', description: 'ID de la ciudad', type: String })
  @ApiResponse({ status: 200, description: 'Ciudad devuelta exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(id);
  }
}
