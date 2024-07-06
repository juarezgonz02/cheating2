import { IsString, IsNumber, IsNotEmpty, IsUUID, IsUrl } from 'class-validator';

export class CreateProductDto {
    @IsNumber()
    @IsNotEmpty()
    category_id: number;

    @IsUUID()
    @IsNotEmpty()
    city_id: string;

    @IsNumber()
    @IsNotEmpty()
    state_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsUrl()
    @IsNotEmpty()
    image_url: string;

    @IsNumber()
    @IsNotEmpty()
    sale_radius: number;

    @IsNumber()
    @IsNotEmpty()
    lat: number;

    @IsNumber()
    @IsNotEmpty()
    long: number;

}
