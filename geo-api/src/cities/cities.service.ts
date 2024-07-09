import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CitiesService {

  constructor(private prismaService: PrismaService) {}

  async findAll() {
    const cities = await this.prismaService.city.findMany({
      select: {
        id: true,
        name: true,
        geom: false,
      },
      orderBy: {
        name: 'asc'
      }
    });
    return cities;
  }

  async findOne(id: string) {
    const city = await this.prismaService.$queryRaw`
      SELECT id, name, ST_AsText(geom) as geom FROM "City" WHERE id = ${id} 
    `;

    return city;
  }
}
