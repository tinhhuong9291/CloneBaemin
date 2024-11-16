import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { MESSAGES } from '../../utils/constants/message';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail(
    {},
    { message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.VALID_EMAIL },
  )
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.IS_REQUIRED,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  email: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.IS_REQUIRED,
  })
  @Length(6, 20, {
    message:
      MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD
        .LENGTH_MUST_BE_FROM_6_TO_20,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  password: string;
}

export class RegisterDto {
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.FIRST_NAME.IS_REQUIRED,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  first_name: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.LAST_NAME.IS_REQUIRED,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  last_name: string;

  @IsEmail(
    {},
    { message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.VALID_EMAIL },
  )
  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.EMAIL.IS_REQUIRED,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  email: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PHONE.IS_REQUIRED,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  phone: string;

  @IsNotEmpty({
    message: MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD.IS_REQUIRED,
  })
  @Length(6, 20, {
    message:
      MESSAGES.VALIDATION_MESSAGES.USER.COMMONS.PASSWORD
        .LENGTH_MUST_BE_FROM_6_TO_20,
  })
  @ApiProperty({
    required: true,
    example: 'string',
  })
  password: string;
}
