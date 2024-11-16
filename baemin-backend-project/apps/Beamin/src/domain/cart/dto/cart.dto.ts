import { ApiProperty } from '@nestjs/swagger';
import { MESSAGES } from '../../../utils/constants/message';
import { IsInt, Max, Min } from 'class-validator';

export class AddCartItemDto {
  @ApiProperty({
    required: true,
    example: 0,
  })
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.CART.QUANTITY_IS_NUMBER,
  })
  @Min(1, { message: MESSAGES.VALIDATION_MESSAGES.CART.QUANTITY_MIN })
  @Max(50, {
    message: MESSAGES.VALIDATION_MESSAGES.CART.QUANTITY_MAX,
  })
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({
    required: true,
    example: 0,
  })
  @IsInt({
    message: MESSAGES.VALIDATION_MESSAGES.CART.QUANTITY_IS_NUMBER,
  })
  @Min(1, { message: MESSAGES.VALIDATION_MESSAGES.CART.QUANTITY_MIN })
  @Max(50, {
    message: MESSAGES.VALIDATION_MESSAGES.CART.QUANTITY_MAX,
  })
  quantity: number;
}
