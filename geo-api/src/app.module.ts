import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [UsersModule, CitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
