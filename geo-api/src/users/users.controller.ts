import { Controller, Get, Param, UseGuards, Req, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req) {
    const role = req.user.role;
    return this.usersService.findAllUsers(role);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req){
    const role = req.user.role;
    return this.usersService.findOneUser(id, role);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string, @Req() req){
    const role = req.user.role;
    return this.usersService.deleteUser(id, role);
  }
}
