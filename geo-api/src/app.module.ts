import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { StatesModule } from './states/states.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, CitiesModule, AuthModule, CategoriesModule, StatesModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
