import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderService } from './orders.service';
import { MESSAGES } from '../../utils/constants/message';
import {
  CreateOrderDto,
  OrderHistoryDto,
  SearchOrderDto,
} from './dto/orders.dto';
import moment from 'moment';
import { Roles } from '../../core/decorators/roles.decorator';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import {
  badRequestResponse,
  unauthorizedResponse,
  notFoundResponse,
  internalServerErrorResponse,
} from '../../swagger/swagger.util';
import { UserRole } from '../../utils/constants/enums';
@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order created successfully!',
      data: order,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  //// Update an order status
  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Patch(':orderId/status')
  @ApiOperation({ summary: 'Update the status of an order' })
  @ApiParam({ name: 'orderId', description: 'ID of the order' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order status updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order not found.',
  })
  async updateOrderStatus(
    @Param('orderId') orderId: number,
    @Body('status') status: string,
  ) {
    const updatedOrder = await this.orderService.updateOrderStatus(
      orderId,
      status,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Order status updated successfully!',
      data: updatedOrder,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // get order history
  @ApiBearerAuth('authorization')
  @Get('history/:userId')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.ORDER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.ORDER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getOrderHistory(
    @Param('userId') userId: string,
    @Query() query: OrderHistoryDto,
  ) {
    return this.orderService.getOrderHistory(userId, query.page, query.limit);
  }
  // search order
  @ApiBearerAuth('authorization')
  @Get('search')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.ORDER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.ORDER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async searchOrders(@Query() searchOrderDto: SearchOrderDto) {
    return this.orderService.searchOrders(searchOrderDto);
  }

  // get details of order
  @ApiBearerAuth('authorization')
  @Get(':id')
  @Roles(UserRole.Admin)
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.ORDER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.ORDER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getOrderDetail(@Param('id') orderId: number) {
    const order = await this.orderService.getOrderDetail(orderId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order details retrieved successfully!',
      data: order,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.ORDER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.ORDER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async remove(@Param('id') orderId: number) {
    await this.orderService.remove(orderId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.ORDER.CANCELLED,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete multiple order by IDs
  @ApiBearerAuth('authorization')
  @Delete('')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the orders to delete',
  })
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(internalServerErrorResponse())
  async deleteMultipleOrder(@Query('id') ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No Order IDs provided');
    }
    await this.orderService.deleteMultipleOrders(ids);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.ORDER.CANCELLED,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
