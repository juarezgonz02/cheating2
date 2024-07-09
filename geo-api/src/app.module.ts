import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { StatesModule } from './states/states.module';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [UsersModule, CitiesModule, AuthModule, CategoriesModule, StatesModule, ProductsModule, 
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'uploads'),
          serveRoot: '/uploads', // route where the files will be served
          serveStaticOptions: {
            extensions: ['jpg'], // serve only .jpeg files
          },
        }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
