import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MESSAGES } from '../../../utils/constants/message';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateVoucherDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.CODE_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.CODE_MUST_BE_STRING,
  })
  @Length(10, 10, {
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.CODE_LENGTH_IS_INVALID,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  code: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.DISCOUNT_IS_REQUIRED,
  })
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.DISCOUNT_IS_NUMBER,
  })
  @Min(1, {
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.DISCOUNT_PER_MIN,
  })
  @Max(100, {
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.DISCOUNT_PER_MAX,
  })
  @ApiProperty({
    required: true,
    example: 'number',
  })
  discount: number;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.EXPIRED_IS_REQUIRED,
  })
  @IsDateString(
    {},
    {
      message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.EXPIRED_INVALID,
    },
  )
  @ApiProperty({
    required: true,
    example: 'string',
  })
  expiration: Date;
}

export class UpdateVoucherDto {
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.CODE_MUST_BE_STRING,
  })
  @Length(10, 10, {
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.CODE_LENGTH_IS_INVALID,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  code?: string;

  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.DISCOUNT_IS_NUMBER,
  })
  @Min(1, {
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.DISCOUNT_PER_MIN,
  })
  @Max(100, {
    message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.DISCOUNT_PER_MAX,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'number',
  })
  discount?: number;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: MESSAGES.VALIDATION_MESSAGES.VOUCHER.EXPIRED_INVALID,
    },
  )
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  expiration?: Date;
}
