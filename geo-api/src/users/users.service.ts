import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Product } from '.prisma/client';


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

  
  async findOneUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    });
  }

  async updatePassword(id: string, newPassword: string) {
    return this.prismaService.user.update({
        where: { id },
        data: { password: newPassword }
    });
  }

  // This metodo only can be used by the ADMIN
  async findAllUsers(role: string): Promise<User[]> {
      if (role !== 'ADMIN') {
        throw new Error('You are not authorized to perform this action');
      }
      const users = await this.prismaService.user.findMany();
      return users;
  }
  
  // This metodo only can be used by the ADMIN
  async findOneUser(id: string): Promise<Product[] | null> {
    return this.prismaService.$queryRaw`
      SELECT 
          p.id,
          p.category_id,
          p.city_id,
          p.state_id,
          p.user_id,
          p.description,
          p.price,
          p.image_url,
          ST_AsText(p.sale_point) as sale_point,
          p.sale_radius
      FROM "User" u
      LEFT JOIN "Product" p ON u.id = p.user_id
      WHERE u.id = ${id}
      
    `;
  }

    // This metodo only can be used by the ADMIN
    async deleteUser(id: string, role: string) {
      if (role !== 'ADMIN') {
        throw new Error('You are not authorized to perform this action');
      }
      return this.prismaService.user.delete({
        where: {
          id
        }
      });
    }

}
