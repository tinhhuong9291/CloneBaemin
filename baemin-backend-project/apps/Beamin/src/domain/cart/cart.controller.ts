import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import {
  badRequestResponse,
  createCartResponse,
  deleteCartResponse,
  deleteMulCartResponse,
  getCartResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updateCartResponse,
} from '../../swagger/swagger.util';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { UpdateCartItemDto } from './dto/cart.dto';
import { MESSAGES } from '../../utils/constants/message';
import moment from 'moment';

@ApiTags('Cart')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard)
  @Post(':foodId')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.CART.CREATE.MESSAGE_TITLE,
  })
  @ApiParam({ name: 'foodId', description: 'ID of the food item' })
  @ApiResponse(createCartResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async addToCart(
    @Param('foodId') foodId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    const { quantity } = updateCartItemDto;
    await this.cartService.addToCart(userId, foodId, quantity);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.CART.INSERT,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard)
  @Put(':foodId')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.CART.UPDATE.MESSAGE_TITLE,
  })
  @ApiParam({ name: 'foodId', description: 'ID of the food item' })
  @ApiResponse(updateCartResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async updateCartItem(
    @Param('foodId') foodId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    const { quantity } = updateCartItemDto;
    await this.cartService.updateCartItem(userId, foodId, quantity);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.CART.UPDATE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard)
  @Get()
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.CART.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getCartResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async getCartItems(@Req() req) {
    const userId = req.user.id;
    const result = await this.cartService.getCartItems(userId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.CART.GET_ALL,
      data: result,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard)
  @Delete(':foodId')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.CART.DELETE.MESSAGE_TITLE,
  })
  @ApiParam({ name: 'foodId', description: 'ID of the food item' })
  @ApiResponse(deleteCartResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async removeCartItem(@Param('foodId') foodId: number, @Req() req) {
    const userId = req.user.id;
    await this.cartService.removeCartItem(userId, foodId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.CART.DELETE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete multiple
  @ApiBearerAuth('authorization')
  @Delete('')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.CART.DELETE_ALL.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the product to delete',
  })
  @ApiResponse(deleteMulCartResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async deleteMultipleProdToCart(@Query('id') ids: string[], @Req() req) {
    const userId = req.user.id;
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No product IDs provided');
    }
    await this.cartService.deleteMultipleProdToCart(ids, userId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.CART.DELETE_ALL,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
