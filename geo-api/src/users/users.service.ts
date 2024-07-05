import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '.prisma/client';
import { RestorePasswordDto } from './dto/restore-password.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: CreateUserDto) {
    return this.prismaService.user.create({
        data: {
            ...user,
        }
    });
  }

  async findOneUser(id: string): Promise<User | null> {
    return this.prismaService.$queryRaw<User[]>`
      SELECT 
        u.id, 
        u.email, 
        u.name, 
        json_agg(json_build_object(
          'id', p.id,
          'category_id', p.category_id,
          'city_id', p.city_id,
          'state_id', p.state_id,
          'user_id', p.user_id,
          'description', p.description,
          'price', p.price,
          'image_url', p.image_url,
          'sale_point', ST_AsText(p.sale_point),
          'sale_radius', p.sale_radius
        )) AS products
      FROM "User" u
      LEFT JOIN "Product" p ON u.id = p.user_id
      WHERE u.id = ${id}
      GROUP BY u.id
    `[0];
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.prismaService.$queryRaw<User[]>`
      SELECT 
        u.id, 
        u.email, 
        u.name, 
        json_agg(json_build_object(
          'id', p.id,
          'category_id', p.category_id,
          'city_id', p.city_id,
          'state_id', p.state_id,
          'user_id', p.user_id,
          'description', p.description,
          'price', p.price,
          'image_url', p.image_url,
          'sale_point', ST_AsText(p.sale_point),
          'sale_radius', p.sale_radius
        )) AS products
      FROM "User" u
      LEFT JOIN "Product" p ON u.id = p.user_id
      GROUP BY u.id
    `;
    return users;
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    });
  }

  async updatePassword(id: string, user: User) {
    return this.prismaService.user.update({
      where: { id },
      data: {
        password: user.password
      }
    });
  }

}
