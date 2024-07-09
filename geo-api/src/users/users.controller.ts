import { Controller, Get, Param, UseGuards, Req, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener lista de usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios devuelta exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAll(@Req() req) {
    const role = req.user.role;
    return this.usersService.findAllUsers(role);
  }

  @UseGuards(AuthGuard)
  @Get('products')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'Usuario devuelto exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(@Req() req){
    const id = req.user.sub
    return this.usersService.findOneUser(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  deleteUser(@Param('id') id: string, @Req() req){
    const role = req.user.role;
    return this.usersService.deleteUser(id, role);
  }
}
