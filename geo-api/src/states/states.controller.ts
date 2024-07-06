import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StatesService } from './states.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.statesService.findAllStates();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statesService.findOneState(+id);
  }
}
