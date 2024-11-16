import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MESSAGES } from '../../../utils/constants/message';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.NAME_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.NAME_MUST_BE_STRING,
  })
  @Length(3, 50, {
    message: MESSAGES.VALIDATION_MESSAGES.STORE.NAME_LENGTH_IS_INVALID,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  store_name: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.ADDRESS_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.ADDRESS_MUST_BE_STRING,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  @Length(3, 100, {
    message:
      MESSAGES.VALIDATION_MESSAGES.STORE
        .ADDRESS_LENGTH_MUST_BETWEEN_3_TO_100_CHARACTERS,
  })
  address: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.PHONE_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.PHONE_MUST_BE_STRING,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  @IsMobilePhone(
    'vi-VN',
    {},
    {
      message:
        MESSAGES.VALIDATION_MESSAGES.STORE.PHONE_LENGTH_MUST_BE_10_CHARACTER,
    },
  )
  phone: string;

  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.URL_IMAGE_IS_REQUIRED,
  })
  @Length(6, 300, {
    message: MESSAGES.VALIDATION_MESSAGES.STORE.URL_IMAGE_MUST_BE_STRING,
  })
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'string',
  })
  images?: string;
}

export class UpdateStoreDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.NAME_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.NAME_MUST_BE_STRING,
  })
  @Length(3, 50, {
    message: MESSAGES.VALIDATION_MESSAGES.STORE.NAME_LENGTH_IS_INVALID,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  store_name?: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.ADDRESS_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.ADDRESS_MUST_BE_STRING,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @Length(3, 100, {
    message:
      MESSAGES.VALIDATION_MESSAGES.STORE
        .ADDRESS_LENGTH_MUST_BETWEEN_3_TO_100_CHARACTERS,
  })
  address?: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.PHONE_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.PHONE_MUST_BE_STRING,
  })
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  @IsMobilePhone(
    'vi-VN',
    {},
    {
      message:
        MESSAGES.VALIDATION_MESSAGES.STORE.PHONE_LENGTH_MUST_BE_10_CHARACTER,
    },
  )
  phone?: string;

  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.URL_IMAGE_IS_REQUIRED,
  })
  @Length(6, 300, {
    message: MESSAGES.VALIDATION_MESSAGES.STORE.URL_IMAGE_MUST_BE_STRING,
  })
  @IsOptional()
  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  images?: string;

  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.DESCRIPTION_MUST_BE_STRING,
  })
  @Length(3, 1000, {
    message: MESSAGES.VALIDATION_MESSAGES.STORE.DESCRIPTION_IS_INVALID,
  })
  description?: string;

  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.EMAIL_MUST_BE_A_STRING,
  })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.WEBSITE_MUST_BE_A_STRING,
  })
  @Length(3, 100, {
    message:
      MESSAGES.VALIDATION_MESSAGES.STORE
        .WEBSITE_LENGTH_MUST_BETWEEN_3_TO_100_CHARACTERS,
  })
  website?: string;

  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.OPENING_HOURS_MUST_BE_STRING,
  })
  opening_hours?: string;

  @ApiPropertyOptional({
    required: false,
    example: 'string',
  })
  @IsOptional()
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.STORE.CLOSING_HOURS_MUST_BE_STRING,
  })
  closing_hours?: string;
}
