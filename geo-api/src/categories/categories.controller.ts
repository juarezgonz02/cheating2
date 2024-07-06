import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Obtener lista de categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías devuelta exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAll() {
    return this.categoriesService.findAllCategories();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', description: 'ID de la categoría', type: String })
  @ApiResponse({ status: 200, description: 'Categoría devuelta exitosamente.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOneCategory(+id);
  }
}
