import { ApiProperty } from '@nestjs/swagger';
import { MESSAGES } from '../../../utils/constants/message';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateBannerDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.NAME_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.NAME_MUST_BE_STRING,
  })
  @Length(3, 50, {
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.NAME_LENGTH_IS_INVALID,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  name: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.URL_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.URL_MUST_BE_STRING,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  url: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.DESCRIPTION_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.DESCRIPTION_MUST_BE_STRING,
  })
  @Length(6, 300, {
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.DESCRIPTION_IS_REQUIRED,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  description: string;
}

export class UpdateBannerDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.NAME_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.NAME_MUST_BE_STRING,
  })
  @Length(10, 50, {
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.NAME_LENGTH_IS_INVALID,
  })
  @ApiProperty({
    required: false,
    example: 'string',
  })
  @IsOptional()
  name: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.URL_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.URL_MUST_BE_STRING,
  })
  @ApiProperty({
    required: false,
    example: 'string',
  })
  @IsOptional()
  url: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.LINK_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.LINK_MUST_BE_STRING,
  })
  @ApiProperty({
    required: false,
    example: 'string',
  })
  @IsOptional()
  link: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.DESCRIPTION_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.DESCRIPTION_MUST_BE_STRING,
  })
  @Length(6, 300, {
    message: MESSAGES.VALIDATION_MESSAGES.BANNER.DESCRIPTION_IS_REQUIRED,
  })
  @ApiProperty({
    required: false,
    example: 'string',
  })
  @IsOptional()
  description: string;
}
