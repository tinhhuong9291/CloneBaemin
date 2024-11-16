import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MESSAGES } from '../../../utils/constants/message';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.NAME_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.NAME_IS_INVALID,
  })
  @Length(5, 100, {
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.NAME_LENGTH_IS_INVALID,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  name: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.PRICE_CANNOT_BE_EMPTY,
  })
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.PRICE_IS_INVALID,
  })
  @IsPositive({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.PRICE_IS_INVALID,
  })
  @ApiProperty({
    required: true,
    example: 'number',
  })
  price: number;

  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.DESCRIPTION_MUST_BE_STRING,
  })
  @Length(1, 1000, {
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.DESCRIPTION_IS_INVALID,
  })
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'string',
  })
  description?: string;

  @ApiProperty({
    required: true,
    example: 'number',
  })
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STORE_ID_IS_REQUIRED,
  })
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STORE_MUST_BE_NUMBERIC,
  })
  store_id: number;

  @ApiPropertyOptional({
    required: false,
    example: 'number',
  })
  @IsOptional()
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.PROMOTION_MUST_BE_NUMBERIC,
  })
  promotion_id?: number;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STOCK_QUANTITY_IS_REQUIRED,
  })
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STOCK_QUANTITY_MUST_BE_NUMBER,
  })
  @Min(0, {
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STOCK_QUANTITY_IS_INVALID,
  })
  @Max(1000, {
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STOCK_QUANTITY_IS_INVALID,
  })
  @ApiProperty({
    required: true,
    example: 'number',
  })
  stock_quantity: number;
}

export class UpdateFoodDto {
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.NAME_IS_INVALID,
  })
  @Length(5, 100, {
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.NAME_LENGTH_IS_INVALID,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  name?: string;

  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.PRICE_IS_INVALID,
  })
  @IsPositive({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.PRICE_IS_INVALID,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'number',
  })
  price?: number;

  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.DESCRIPTION_MUST_BE_STRING,
  })
  @Length(1, 1000, {
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.DESCRIPTION_IS_INVALID,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  description?: string;

  @ApiPropertyOptional({
    required: false,
    example: 'number',
  })
  @IsOptional()
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STORE_MUST_BE_NUMBERIC,
  })
  store_id?: number;

  @ApiPropertyOptional({
    required: false,
    example: 'number',
  })
  @IsOptional()
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.PROMOTION_MUST_BE_NUMBERIC,
  })
  promotion_id?: number;

  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STOCK_QUANTITY_MUST_BE_NUMBER,
  })
  @Min(0, {
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STOCK_QUANTITY_IS_INVALID,
  })
  @Max(1000, {
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.STOCK_QUANTITY_IS_INVALID,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'number',
  })
  stock_quantity?: number;

  @ApiPropertyOptional({
    required: false,
    example: 'boolean',
  })
  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}

export class SearchFoodDto {
  @ApiPropertyOptional({
    description: 'Name of the food item',
    example: 'pizza',
    required: false,
  })
  @IsOptional()
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.NAME_IS_INVALID,
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the food item',
    example: 'A delicious pizza with extra cheese',
    required: false,
  })
  @IsOptional()
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.DESCRIPTION_MUST_BE_STRING,
  })
  description?: string;
}

export class AddFoodImagesDto {
  @IsUrl()
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.IMAGE_URL_IS_REQUIRED,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  image_url: string;

  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.DESCRIPTION_IMG_MUST_BE_STRING,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    required: false,
    example: 'boolean',
  })
  is_primary?: boolean;
}

export class UpdateFoodImageDto {
  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  image_url?: string;

  @IsOptional()
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.FOOD.DESCRIPTION_IMG_MUST_BE_STRING,
  })
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    required: false,
    example: 'boolean',
  })
  is_primary?: boolean;
}
