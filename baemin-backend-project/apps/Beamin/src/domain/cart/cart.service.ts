import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CartService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Add a product to the cart or increment the quantity if it already exists
  async addToCart(userId: string, foodId: number, quantity: number = 1) {
    // Check if the food item exists
    const food = await this.prisma.food.findUnique({
      where: { food_id: +foodId, is_removed: false, is_available: true },
    });
    if (!food) {
      throw new NotFoundException(`Food item with ID ${foodId} not found`);
    }

    // Check if the item is already in the cart
    const existingCartItem = await this.prisma.cart.findUnique({
      where: { user_id_food_id: { user_id: userId, food_id: +foodId } },
    });

    if (existingCartItem) {
      return await this.prisma.cart.update({
        where: { user_id_food_id: { user_id: userId, food_id: +foodId } },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      return await this.prisma.cart.create({
        data: {
          user_id: userId,
          food_id: foodId,
          quantity: quantity,
        },
      });
    }
  }

  // Update the quantity of a specific product in the cart
  async updateCartItem(userId: string, foodId: number, quantity: number) {
    // Checking product existing in systems
    const existingFood = await this.prisma.food.findUnique({
      where: { food_id: +foodId, is_removed: false, is_available: true },
    });
    if (!existingFood) {
      throw new NotFoundException(`Food with ID ${foodId} not found.`);
    }

    // Checking user existing in system
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId, status: false },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Ensure the item exists in the cart
    const existingCartItem = await this.prisma.cart.findUnique({
      where: { user_id_food_id: { user_id: userId, food_id: foodId } },
    });

    if (!existingCartItem) {
      throw new NotFoundException(
        `Item with food ID ${foodId} not found in cart`,
      );
    }

    // Update the quantity
    return await this.prisma.cart.update({
      where: { user_id_food_id: { user_id: userId, food_id: foodId } },
      data: { quantity },
    });
  }

  // Get all products in the user's cart
  async getCartItems(userId: string) {
    return await this.prisma.cart.findMany({
      where: { user_id: userId },
      include: {
        Food: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  // Remove a product from the cart
  async removeCartItem(userId: string, foodId: number) {
    const cartItem = await this.prisma.cart.findUnique({
      where: { user_id_food_id: { user_id: userId, food_id: foodId } },
    });

    if (!cartItem) {
      throw new NotFoundException(
        `Item with food ID ${foodId} not found in cart`,
      );
    }

    return await this.prisma.cart.delete({
      where: { user_id_food_id: { user_id: userId, food_id: foodId } },
    });
  }

  // Delete multiple product from the cart
  async deleteMultipleProdToCart(
    ids: string | string[],
    userId: string,
  ): Promise<{
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

    const existingProdToCart = await this.prisma.cart.findMany({
      where: { food_id: { in: uniqueIds }, user_id: userId },
      select: { food_id: true },
    });

    const existingIds = existingProdToCart.map(item => item.food_id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following cart IDs were not found: ${notFoundIds.join(', ')}`,
      );
    }

    await this.prisma.cart.deleteMany({
      where: { food_id: { in: existingIds }, user_id: userId },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }
}
