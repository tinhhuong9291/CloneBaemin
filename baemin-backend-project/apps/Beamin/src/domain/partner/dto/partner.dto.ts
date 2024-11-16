import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MESSAGES } from '../../../utils/constants/message';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePartnerDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.NAME_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.NAME_MUST_BE_STRING,
  })
  @Length(3, 50, {
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.NAME_LENGTH_IS_INVALID,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  partner_name: string;

  @ApiPropertyOptional({
    description: 'The service fee charged by the shipping partner',
    example: 0,
  })
  @IsOptional()
  @IsNumber(
    {},
    { message: MESSAGES.VALIDATION_MESSAGES.PARTNER.SERVICE_FEE_IS_NUMBER },
  )
  @Max(1000000, {
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.SERVICE_FEE_MAX,
  })
  @Min(0, {
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.SERVICE_FEE_MIN,
  })
  service_fee?: number;
}

export class UpdatePartnerDto {
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.NAME_MUST_BE_STRING,
  })
  @Length(3, 50, {
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.NAME_LENGTH_IS_INVALID,
  })
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  partner_name?: string;

  @ApiPropertyOptional({
    description: 'The service fee charged by the shipping partner',
    example: 0,
  })
  @IsOptional()
  @IsNumber(
    {},
    { message: MESSAGES.VALIDATION_MESSAGES.PARTNER.SERVICE_FEE_IS_NUMBER },
  )
  @Max(1000000, {
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.SERVICE_FEE_MAX,
  })
  @Min(0, {
    message: MESSAGES.VALIDATION_MESSAGES.PARTNER.SERVICE_FEE_MIN,
  })
  service_fee?: number | 0;
}
