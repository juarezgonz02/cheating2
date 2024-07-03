import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, CitiesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
