import { ApiProperty } from '@nestjs/swagger';
import { MESSAGES } from '../../../utils/constants/message';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.MENU.NAME_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.MENU.NAME_MUST_BE_STRING,
  })
  @Length(3, 50, {
    message: MESSAGES.VALIDATION_MESSAGES.MENU.NAME_LENGTH_IS_INVALID,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  name: string;

  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.MENU.URL_IMAGE_MUST_BE_STRING,
  })
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'string',
  })
  image?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'string',
  })
  parent_id?: string;
}

export class UpdateMenuDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.MENU.NAME_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.MENU.NAME_MUST_BE_STRING,
  })
  @Length(3, 50, {
    message: MESSAGES.VALIDATION_MESSAGES.MENU.NAME_LENGTH_IS_INVALID,
  })
  @ApiProperty({
    required: false,
    example: 'string',
  })
  @IsOptional()
  name: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.MENU.URL_IMAGE_IS_REQUIRED,
  })
  @IsString({
    message: MESSAGES.VALIDATION_MESSAGES.MENU.URL_IMAGE_MUST_BE_STRING,
  })
  @ApiProperty({
    required: false,
    example: 'string',
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    required: false,
    example: 'string',
  })
  @IsOptional()
  parent_id?: string;
}
