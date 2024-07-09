import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    category_id: string;

    @IsString()
    @IsNotEmpty()
    city_id: string;

    @IsString()
    @IsNotEmpty()
    state_id: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    sale_radius: string;

    @IsString()
    @IsNotEmpty()
    lat: string;

    @IsString()
    @IsNotEmpty()
    long: string;
}
