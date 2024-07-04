import { Module } from '@nestjs/common';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StatesController],
  providers: [StatesService],
  imports: [PrismaModule]
})
export class StatesModule {}
