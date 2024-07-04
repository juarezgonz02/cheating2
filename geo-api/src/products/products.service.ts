import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { category_id, city_id, state_id, user_id, name, description, price, image_url, sale_radius, lat, long } = createProductDto;
    const point = `POINT(${long} ${lat})`;
    const id = uuidv4();
  
    return await this.prismaService.$executeRaw`
      INSERT INTO "Product" (id, category_id, city_id, state_id, user_id, name, description, price, image_url, sale_point, sale_radius)
      VALUES (${id}, ${category_id}, ${city_id}, ${state_id}, ${user_id}, ${name}, ${description}, ${price}, ${image_url}, ST_GeomFromText(${point}, 4326), ${sale_radius})
    `;
  }
  
  async findAllProducts() {
    const products = await this.prismaService.$queryRaw`
      SELECT id, category_id, city_id, state_id, user_id, description, price, image_url, ST_GeomFromText(sale_point), sale_radius FROM "Product"
    `;

    return products;
  }

  async findOneProduct(id: string) {
    const product = await this.prismaService.$queryRaw`
      SELECT id, category_id, city_id, state_id, user_id, description, price, image_url, ST_AsText(sale_point), sale_radius FROM "Product" WHERE id = ${id}
    `;
    return product[0];
  }

  async deleteProduct(id: string) {
    return this.prismaService.$queryRaw`
      DELETE FROM "Product" WHERE id = ${id}
    `;
  }
}
