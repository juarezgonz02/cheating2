import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

}
