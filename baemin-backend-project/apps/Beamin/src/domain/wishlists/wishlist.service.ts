import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { PaginationWhishListDto } from '../../core/dtos/pagination.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WishlistService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}
  // Get all list of whishlist
  async getAllWhishlist(userId: string) {
    const whishList = await this.prisma.favoriteFood.findMany({
      where: {
        user_id: userId,
      },
      include: {
        Food: true,
      },
    });
    return whishList.map(item => item.Food);
  }

  // Get all wishList using pagiantion
  async getWishListPagination(paginationDto: PaginationWhishListDto) {
    const { page, limit, added_at, sortField, sortOrder } = paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.FavoriteFoodWhereInput = {
      ...(added_at && { added_at: { gte: new Date(added_at) } }),
    };

    const orderBy: Prisma.FavoriteFoodOrderByWithAggregationInput = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const wishList = await this.prisma.favoriteFood.findMany({
      skip: offset,
      take: limit,
      where: filters,
      include: {
        Food: true,
      },
      orderBy: sortField ? orderBy : { added_at: 'desc' },
    });

    const totalItems = await this.prisma.favoriteFood.count({ where: filters });
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: wishList.map(item => item.Food),
      pagination: {
        totalItems: totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }
}
