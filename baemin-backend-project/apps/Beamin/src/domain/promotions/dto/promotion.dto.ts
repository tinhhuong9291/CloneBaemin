import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MESSAGES } from '../../../utils/constants/message';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePromotionDto {
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DESC_MUST_BE_STRING,
  })
  @Length(6, 300, {
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.DESCRIPTION_LENGTH_IS_INVALID,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  description: string;

  @ApiProperty({
    required: true,
    example: 'number',
  })
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DISCOUNT_IS_NUMBER,
  })
  @Min(1, {
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DISCOUNT_PER_MIN,
  })
  @Max(100, {
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DISCOUNT_PER_MAX,
  })
  discount: number;

  @ApiProperty({
    required: true,
    example: 'string',
  })
  @IsDateString(
    {},
    {
      message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.START_DATE_INVALID,
    },
  )
  start_at: Date;

  @ApiProperty({
    required: true,
    example: 'string',
  })
  @IsDateString(
    {},
    {
      message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.END_DATE_INVALID,
    },
  )
  end_at: Date;
}

export class UpdatePromotionDto {
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DESC_MUST_BE_STRING,
  })
  @Length(6, 300, {
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DESC_LENGTH_IS_INVALID,
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
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DISCOUNT_IS_NUMBER,
  })
  @Min(1, {
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DISCOUNT_PER_MIN,
  })
  @Max(100, {
    message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.DISCOUNT_PER_MAX,
  })
  discount?: number;

  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.START_DATE_INVALID,
    },
  )
  start_at?: Date;

  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.END_DATE_INVALID,
    },
  )
  end_at?: Date;
}
