import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/addProduct')
  @UseGuards(AuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto, @Req() req) {
    const userId = req.user.sub;
    return this.productsService.createProduct(createProductDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAllProducts();
  }

  @UseGuards(AuthGuard)
  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneProduct(id);
  }

  @UseGuards(AuthGuard)
  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @UseGuards(AuthGuard)
  @Get('/findProductInRadius')
  findProductInRadius(
    @Query('lat') lat: number,
    @Query('long') long: number,
    @Query('radius') radius: number,
  ) {
    return this.productsService.findProductInRadius(lat, long, radius);
  }

  @UseGuards(AuthGuard)
  @Get('/findProductInRadiusByCategoriaAndName')
  findProductInRadiusByCategoriaAndName(
    @Query('lat') lat: number,
    @Query('long') long: number,
    @Query('radius') radius: number,
    @Query('category_id') category_id: string,
    @Query('name') name: string,
  ) {

    const category_id_number = parseInt(category_id);

    return this.productsService.findProductInRadiusByCategoriaAndName(
      lat,
      long,
      radius,
      category_id_number,
      name,
    );
  }
}
