import {
  IsString,
  IsOptional,
  IsUUID,
  IsDecimal,
  IsBoolean,
  IsDateString,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ description: 'User ID', example: 'uuid' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ description: 'Address Line 1', example: '123 Main St' })
  @IsString()
  address_line1: string;

  @ApiProperty({
    description: 'Address Line 2',
    example: 'Apt 4B',
    required: false,
  })
  @IsOptional()
  @IsString()
  address_line2?: string;

  @ApiProperty({ description: 'City', example: 'New York' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Postal Code', example: '10001' })
  @IsString()
  postal_code: string;

  @ApiProperty({ description: 'Address Type', example: 'Home' })
  @IsString()
  address_type: string;

  @ApiProperty({ description: 'Latitude', example: 40.712776, required: false })
  @IsOptional()
  @IsDecimal()
  latitude?: number;

  @ApiProperty({
    description: 'Longitude',
    example: -74.005974,
    required: false,
  })
  @IsOptional()
  @IsDecimal()
  longitude?: number;

  @ApiProperty({ description: 'Is Removed', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  is_removed?: boolean;
}
export class PaginationDto {
  @IsInt()
  page: number;

  @IsInt()
  limit: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  created_at?: string;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}
