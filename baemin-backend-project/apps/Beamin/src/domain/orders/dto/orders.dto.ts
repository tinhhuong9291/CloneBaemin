import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
  @ApiProperty()
  @IsUUID()
  userId: string;
  @ApiProperty()
  @IsInt()
  addressId: number;
  @ApiProperty()
  @IsInt()
  storeId: number;
  @ApiProperty()
  @IsOptional()
  @IsInt()
  voucherId?: number;
  @ApiProperty()
  @IsOptional()
  @IsInt()
  methodId?: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  message?: string;
  @ApiProperty()
  @IsOptional()
  @IsInt()
  totalDiscount?: number;
  @ApiProperty()
  @IsOptional()
  @IsInt()
  totalPrice?: number;
  @ApiProperty()
  @IsOptional()
  @IsInt()
  serviceFee?: number;
  @ApiProperty()
  @IsOptional()
  @IsInt()
  shippingPrice?: number;
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isRemoved?: boolean;
  @ApiProperty()
  @IsArray()
  orderFoods: {
    foodId: number;
    quantity: number;
    discountAtOrder?: number; // Optional
    priceAtTimeOfOrder: number; // Required
  }[];
}

export class OrderHistoryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class SearchOrderDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  orderId?: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;
}
