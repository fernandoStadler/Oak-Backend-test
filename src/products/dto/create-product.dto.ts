import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDecimal,
  IsDateString,
} from 'class-validator';

export class CreateProductDto {

  @IsNotEmpty()
  @IsNumber()
  productCode: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDecimal()
  productPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  availableForSale: boolean;


  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;


  @ApiProperty()
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
