import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@prisma/client';
import { Prisma } from '@prisma/client';


@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto, userId: string) {
    const { category_id, city_id, state_id, name, description, price, image_url, sale_radius, lat, long } = createProductDto;
    const point = `POINT(${long} ${lat})`;
    const id = uuidv4();

    return await this.prismaService.$executeRaw`
      INSERT INTO "Product" (id, category_id, city_id, state_id, user_id, name, description, price, image_url, sale_point, sale_radius)
      VALUES (${id}, ${category_id}, ${city_id}, ${state_id}, ${userId}, ${name}, ${description}, ${price}, ${image_url}, ST_GeomFromText(${point}, 4326), ${sale_radius})
    `;
  }
  
  async findAllProducts() {
    const products = await this.prismaService.$queryRaw`
      SELECT id, category_id, city_id, state_id, user_id, description, price, image_url, ST_AsText(sale_point), sale_radius FROM "Product"
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

  async findProductInRadius(lat: number, long: number, radius: number) {
    const point = `POINT(${long} ${lat})`;
    const radiusInDegrees = radius / 111320; 
    
    console.log('Received parameters:', { lat, long, radius }); 
    console.log('Generated point and radiusInDegrees:', { point, radiusInDegrees });
  
    const products = await this.prismaService.$queryRaw<Product[]>`
      SELECT id, category_id, city_id, state_id, user_id, description, price, image_url, ST_AsText(sale_point) AS sale_point, sale_radius
      FROM "Product"
      WHERE ST_DWithin(
        sale_point, 
        ST_SetSRID(ST_GeomFromText(${point}), 4326), 
        ${radiusInDegrees}
      )
    `;
  
    if (!products.length) {
      return "No hay productos en el radio proporcionado";
    }
    else {
      return products;
    }
  }
  
  

  async findProductInRadiusByCategoriaAndName(lat: number, long: number, radius: number, category_id?: number, name?: string) {
    const point = `POINT(${long} ${lat})`;
    const radiusInDegrees = radius / 111320; 

    console.log('Received parameters:', { lat, long, radius, category_id, name }); 
    console.log('Generated point and radiusInDegrees:', { point, radiusInDegrees });

    let query = Prisma.sql`
      SELECT id, category_id, city_id, state_id, user_id, name, description, price, image_url, ST_AsText(sale_point) AS sale_point, sale_radius
      FROM "Product"
      WHERE ST_DWithin(
        sale_point, 
        ST_SetSRID(ST_GeomFromText(${point}), 4326), 
        ${radiusInDegrees}
      )
    `;

    if (category_id !== undefined) {
        query = Prisma.sql`${query} AND category_id = ${category_id}`;
    }
    if (name !== undefined) {
        query = Prisma.sql`${query} AND name = ${name}`;
    }

    const products = await this.prismaService.$queryRaw<Product[]>(query);
  
    if (!products.length) {
      return "No hay productos en el radio proporcionado";
    } else {
      return products;
    }
  }
}
