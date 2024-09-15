import { IsNotEmpty, IsString, IsInt, IsUrl, IsNumber } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsUrl()
  @IsNotEmpty()
  profile_image_url: string;

  @IsUrl()
  @IsNotEmpty()
  car_image_url: string;

  @IsInt()
  car_seats: number;

  @IsNumber()
  rating: number;
}
