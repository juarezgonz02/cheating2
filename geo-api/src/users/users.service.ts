import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';
import { User } from '.prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: CreateUserDto) {
    return this.prismaService.user.create({
        data: {
            ...user
        }
    });
  }

  async findOneUser(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id
      }
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    });
  }
}
