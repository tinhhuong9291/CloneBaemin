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
import { CreateVoucherDto, UpdateVoucherDto } from './dto/voucher.dto';

@Injectable()
export class VoucherService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Get all list of vouchers
  async getAllVouchers() {
    const vouchers = await this.prisma.voucher.findMany({
      where: {
        is_removed: false,
      },
    });
    return vouchers;
  }

  // Get all vouchers using pagiantion
  async getVouchers(paginationDto: PaginationDto) {
    const { page, limit, name, created_at, sortField, sortOrder } =
      paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.VoucherWhereInput = {
      is_removed: false,
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(created_at && { created_at: { gte: new Date(created_at) } }),
    };

    const orderBy: Prisma.VoucherOrderByWithRelationInput = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const vouchers = await this.prisma.voucher.findMany({
      skip: offset,
      take: limit,
      where: filters,
      orderBy: sortField ? orderBy : { created_at: 'desc' },
    });

    const totalVouchers = await this.prisma.voucher.count({ where: filters });
    const totalPages = Math.ceil(totalVouchers / limit);

    return {
      data: vouchers,
      pagination: {
        totalItems: totalVouchers,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  // Get an existing vouchers by id
  async getVoucherById(id: number) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { voucher_id: +id, is_removed: false },
    });
    if (!voucher) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
      );
    }
    return voucher;
  }

  // Create a new voucher
  async createVoucher(createVoucherDto: CreateVoucherDto) {
    const { code } = createVoucherDto;
    const existingVoucher = await this.prisma.voucher.findUnique({
      where: { code, is_removed: false },
    });

    if (existingVoucher) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.VOUCHER.CODE_ALREADY_EXISTS,
      );
    }

    return this.prisma.voucher.create({
      data: createVoucherDto,
    });
  }

  // Update an existing voucher
  async updateVoucher(id: number, updateVoucherDto: UpdateVoucherDto) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { voucher_id: +id, is_removed: false },
    });
    if (!voucher) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
      );
    }

    return await this.prisma.voucher.update({
      where: { voucher_id: +id },
      data: updateVoucherDto,
    });
  }

  // Delete a voucher by ID
  async deleteVoucher(id: number) {
    const voucher = await this.prisma.voucher.findUnique({
      where: { voucher_id: +id, is_removed: false },
    });
    if (!voucher) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
      );
    }
    return this.prisma.voucher.update({
      where: { voucher_id: +id },
      data: { is_removed: true },
    });
  }

  // Delete multiple voucher by id
  async deleteMultipleVouchers(ids: string | string[]): Promise<{
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

    const existingVouchers = await this.prisma.voucher.findMany({
      where: { voucher_id: { in: uniqueIds } },
      select: { voucher_id: true },
    });

    const existingIds = existingVouchers.map(item => item.voucher_id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following voucher IDs were not found: ${notFoundIds.join(', ')}`,
      );
    }

    await this.prisma.voucher.updateMany({
      where: { voucher_id: { in: existingIds } },
      data: { is_removed: true },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }
}
