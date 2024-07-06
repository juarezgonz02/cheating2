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

  @Get()
  findAll() {
    return this.productsService.findAllProducts();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOneProduct(id);
  }

  @Delete('/id/:id')
  remove(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get('/findProductInRadius')
  findProductInRadius(
    @Query('lat') lat: number,
    @Query('long') long: number,
    @Query('radius') radius: number,
  ) {
    console.log('Received parameters:', { lat, long, radius });

    return this.productsService.findProductInRadius(lat, long, radius);
  }

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
