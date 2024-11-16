import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import { MESSAGES } from '../../utils/constants/message';
import { CreatePromotionDto, UpdatePromotionDto } from './dto/promotion.dto';

@Injectable()
export class PromotionService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}
  // Get all list of promotions
  async getAllPromotion() {
    const promotions = await this.prisma.promotion.findMany({
      where: {
        is_removed: false,
      },
    });
    return promotions;
  }

  // Get all promotions using pagiantion
  async getPromotionPagination(paginationDto: PaginationDto) {
    const { page, limit, name, created_at, sortField, sortOrder } =
      paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.PromotionWhereInput = {
      is_removed: false,
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(created_at && { created_at: { gte: new Date(created_at) } }),
    };

    const orderBy: Prisma.PromotionOrderByWithRelationInput = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const promotions = await this.prisma.promotion.findMany({
      skip: offset,
      take: limit,
      where: filters,
      orderBy: sortField ? orderBy : { created_at: 'desc' },
    });

    const totalPromotions = await this.prisma.promotion.count({
      where: filters,
    });
    const totalPages = Math.ceil(totalPromotions / limit);

    return {
      data: promotions,
      pagination: {
        totalItems: totalPromotions,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  // Get an existing promotions by id
  async getPromotionById(id: number) {
    const promotion = await this.prisma.promotion.findUnique({
      where: { promotion_id: +id, is_removed: false },
    });
    if (!promotion) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
      );
    }
    return promotion;
  }

  // Create a new promotions
  async createPromotion(createPromotionDto: CreatePromotionDto) {
    const { description, discount, start_at, end_at } = createPromotionDto;
    if (new Date(start_at) >= new Date(end_at)) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.INVALID_DATE,
      );
    }
    return this.prisma.promotion.create({
      data: { description, discount, start_at, end_at },
    });
  }

  // Update an existing promotions
  async updatePromotion(id: number, updatePromotionDto: UpdatePromotionDto) {
    const { start_at, end_at } = updatePromotionDto;
    const promotion = await this.prisma.promotion.findUnique({
      where: { promotion_id: +id, is_removed: false },
    });
    if (!promotion) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
      );
    }

    if (start_at && end_at && new Date(start_at) >= new Date(end_at)) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.INVALID_DATE,
      );
    }

    return this.prisma.promotion.update({
      where: { promotion_id: id },
      data: updatePromotionDto,
    });
  }

  // Delete a promotions by ID
  async deletePromotion(id: number) {
    const promotion = await this.prisma.promotion.findUnique({
      where: { promotion_id: +id, is_removed: false },
    });
    if (!promotion) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
      );
    }
    return this.prisma.promotion.update({
      where: { promotion_id: +id },
      data: { is_removed: true },
    });
  }

  // Delete multiple promotions by id
  async deleteMultiplePromotions(ids: string | string[]): Promise<{
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

    const existingPromotion = await this.prisma.promotion.findMany({
      where: { promotion_id: { in: uniqueIds } },
      select: { promotion_id: true },
    });

    const existingIds = existingPromotion.map(item => item.promotion_id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following promotions IDs were not found: ${notFoundIds.join(
          ', ',
        )}`,
      );
    }

    await this.prisma.promotion.updateMany({
      where: { promotion_id: { in: existingIds } },
      data: { is_removed: true },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }
}
