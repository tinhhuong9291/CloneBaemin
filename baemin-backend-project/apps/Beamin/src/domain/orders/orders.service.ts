import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { CreateOrderDto, SearchOrderDto } from './dto/orders.dto';
import { omit } from 'lodash';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    const {
      userId,
      addressId,
      storeId,
      voucherId,
      methodId,
      message,
      totalDiscount,
      totalPrice,
      serviceFee,
      shippingPrice,
      orderFoods,
    } = createOrderDto;

    if (totalDiscount < 0) {
      throw new BadRequestException(
        'Total discount must be greater than or equal to 0.',
      );
    }
    if (totalPrice < 0) {
      throw new BadRequestException(
        'Total price must be greater than or equal to 0.',
      );
    }
    if (serviceFee < 0) {
      throw new BadRequestException(
        'Service fee must be greater than or equal to 0.',
      );
    }
    if (shippingPrice < 0) {
      throw new BadRequestException(
        'Shipping price must be greater than or equal to 0.',
      );
    }

    // Check and deduct inventory
    for (const item of orderFoods) {
      if (item.quantity <= 0) {
        throw new BadRequestException(
          `The quantity ordered for the item with ID ${item.foodId} cannot be negative or zero.`,
        );
      }

      const food = await this.prisma.food.findUnique({
        where: { food_id: item.foodId },
      });

      if (!food || food.stock_quantity < item.quantity) {
        throw new NotFoundException(
          `The item with ID ${item.foodId} is not in stock.`,
        );
      }

      // Update inventory quantity
      await this.prisma.food.update({
        where: { food_id: item.foodId },
        data: {
          stock_quantity: food.stock_quantity - item.quantity,
        },
      });
    }

    const order = await this.prisma.order.create({
      data: {
        user_id: userId,
        address_id: addressId,
        store_id: storeId,
        voucher_id: voucherId,
        method_id: methodId,
        message: message,
        total_discount: totalDiscount,
        total_price: totalPrice,
        service_fee: serviceFee,
        shipping_price: shippingPrice,
        order_foods: {
          create: orderFoods.map(item => ({
            food_id: item.foodId,
            quantity: item.quantity,
            discount_at_order: item.discountAtOrder, // Optional
            price_at_time_of_order: item.priceAtTimeOfOrder, // Required
          })),
        },
      },
      include: {
        order_foods: true,
      },
    });

    // return 'Order successful';
    return {
      ...omit(order, [
        'order_id',
        'address_id',
        'user_id',
        'store_id',
        'voucherId',
        'method_id',
        'created_at',
        'updated_at',
        'is_removed',
      ]),
      order_foods: order.order_foods.map(item => ({
        ...omit(item, ['order_id', 'food_id', 'created_at', 'updated_at']),
      })),
    };
  }

  // Order Status Update Method
  async updateOrderStatus(orderId: number, status: string): Promise<any> {
    const order = await this.prisma.order.findUnique({
      where: { order_id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} does not exist.`);
    }

    const orderUpdate = await this.prisma.order.update({
      where: { order_id: orderId },
      data: {
        status: status,
      },
    });

    return {
      ...omit(order, [
        'order_id',
        'address_id',
        'user_id',
        'store_id',
        'voucherId',
        'method_id',
        'created_at',
        'updated_at',
        'is_removed',
      ]),
    };
  }

  async getOrderHistory(
    userId: string,
    page: number,
    limit: number,
  ): Promise<any> {
    const skip = (page - 1) * limit;

    const [orders, totalCount] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: { user_id: userId },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.order.count({
        where: { user_id: userId },
      }),
    ]);

    return {
      ...omit(orders, [
        'order_id',
        'address_id',
        'user_id',
        'store_id',
        'voucherId',
        'method_id',
        'created_at',
        'updated_at',
        'is_removed',
      ]),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async getOrderDetail(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { order_id: orderId },
      include: {
        order_foods: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} does not exist.`);
    }

    return {
      ...omit(order, [
        'order_id',
        'address_id',
        'user_id',
        'store_id',
        'voucherId',
        'method_id',
        'created_at',
        'updated_at',
        'is_removed',
      ]),
      order_foods: order.order_foods.map(item => ({
        ...omit(item, ['order_id', 'food_id', 'created_at', 'updated_at']),
      })),
    };
  }

  async searchOrders(searchOrderDto: SearchOrderDto): Promise<any> {
    const { orderId, status } = searchOrderDto;

    const whereClause = {
      ...(orderId && { order_id: orderId }),
      ...(status && { status }),
    };

    const orders = await this.prisma.order.findMany({
      where: whereClause,
    });

    if (orders.length === 0) {
      throw new NotFoundException('No orders found.');
    }

    return {
      ...omit(orders, [
        'order_id',
        'address_id',
        'user_id',
        'store_id',
        'voucherId',
        'method_id',
        'created_at',
        'updated_at',
        'is_removed',
      ]),
    };
  }

  async remove(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { order_id: orderId },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    if (order.is_removed === true) {
      throw new NotFoundException(`Order with ID ${orderId} already removed`);
    }

    await this.prisma.order.update({
      where: { order_id: orderId },
      data: { is_removed: true },
    });
    return { message: `Order with ID ${orderId} has been removed` };
  }

  async deleteMultipleOrders(ids: string | string[]): Promise<{
    deletedIds: number[];
    notFoundIds: number[];
    duplicateIds: number[];
  }> {
    const idArray = Array.isArray(ids) ? ids : [ids];
    const numbIds = idArray.map(item => +item);
    const uniqueIds = Array.from(new Set(numbIds));
    const duplicateIds = numbIds.filter(
      (id, index) => numbIds.indexOf(id) !== index,
    );

    const existingOrders = await this.prisma.order.findMany({
      where: { order_id: { in: uniqueIds } },
      select: { order_id: true },
    });

    const existingIds = existingOrders.map(item => item.order_id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following order IDs were not found: ${notFoundIds.join(', ')}`,
      );
    }

    await this.prisma.order.updateMany({
      where: { order_id: { in: existingIds } },
      data: { is_removed: true },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }
}
