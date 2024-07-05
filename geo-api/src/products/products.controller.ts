import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/addProduct')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
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
    @Query('radius') radius: number
  ) { 

    console.log('Received parameters:', { lat, long, radius });
    
    return this.productsService.findProductInRadius(lat, long, radius);
  }



  // @Get('/findProductInRadiusByCategoriaAndName')
  // async findProductInRadiusByCategoriaAndName(
  //   @Query('lat', ParseIntPipe) lat: number,
  //   @Query('long', ParseIntPipe) long: number,
  //   @Query('radius', ParseIntPipe) radius: number,
  //   @Query('category_id', ParseIntPipe) category_id: number,
  //   @Query('name') name: string
  // ) {
    
  //   return this.productsService.findProductInRadiusByCategoriaAndName(lat, long, radius, category_id, name);
  // }
}
