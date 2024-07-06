import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { StatesService } from './states.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('states')
@ApiBearerAuth()
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener lista de estados' })
  @ApiResponse({ status: 200, description: 'Lista de estados devuelta exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAll() {
    return this.statesService.findAllStates();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estado por ID' })
  @ApiParam({ name: 'id', description: 'ID del estado', type: String })
  @ApiResponse({ status: 200, description: 'Estado devuelto exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Estado no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.statesService.findOneState(+id);
  }
}

