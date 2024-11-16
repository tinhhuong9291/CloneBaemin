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
import { CreateStoreDto, UpdateStoreDto } from './dto/stores.dto';

@Injectable()
export class StoreService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}
  // Get all list of stores
  async getAllStore() {
    const stores = await this.prisma.store.findMany();
    return stores;
  }

  // Get all store using pagiantion
  async getStores(paginationDto: PaginationDto) {
    const { page, limit, name, created_at, sortField, sortOrder } =
      paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.StoreWhereInput = {
      is_removed: false,
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(created_at && { created_at: { gte: new Date(created_at) } }),
    };

    const orderBy: Prisma.StoreOrderByWithRelationInput = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const stores = await this.prisma.store.findMany({
      skip: offset,
      take: limit,
      where: filters,
      orderBy: sortField ? orderBy : { created_at: 'desc' },
    });

    const totalStores = await this.prisma.store.count({ where: filters });
    const totalPages = Math.ceil(totalStores / limit);

    return {
      data: stores,
      pagination: {
        totalItems: totalStores,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  // Get an existing store by id
  async getStoreById(id: number) {
    const store = await this.prisma.store.findUnique({
      where: { store_id: id, is_removed: false },
    });
    if (!store) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND);
    }
    return store;
  }

  // Create a new store
  async createStore(createStoreDto: CreateStoreDto) {
    let { store_name } = createStoreDto;
    const existingStore = await this.prisma.store.findFirst({
      where: { store_name, is_removed: false },
    });

    if (existingStore) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.STORE.ALREADY_EXITST,
      );
    }

    return await this.prisma.store.create({
      data: {
        ...createStoreDto,
      },
    });
  }

  // Update an existing store
  async updateStore(id: number, updateStoreDto: UpdateStoreDto) {
    const storeItem = await this.prisma.store.findUnique({
      where: { store_id: +id, is_removed: false },
    });
    if (!storeItem) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND);
    }
    return await this.prisma.store.update({
      where: { store_id: +id },
      data: updateStoreDto,
    });
  }

  // Delete a store by ID
  async deleteStore(id: number) {
    const storeItem = await this.prisma.store.findUnique({
      where: { store_id: +id, is_removed: false },
    });
    if (!storeItem) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND);
    }
    return this.prisma.store.update({
      where: { store_id: +id },
      data: { is_removed: true },
    });
  }

  // Delete multiple store by id
  async deleteMultipleStores(ids: string | string[]): Promise<{
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

    const existingStores = await this.prisma.store.findMany({
      where: { store_id: { in: uniqueIds } },
      select: { store_id: true },
    });

    const existingIds = existingStores.map(item => item.store_id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following store IDs were not found: ${notFoundIds.join(', ')}`,
      );
    }

    await this.prisma.store.updateMany({
      where: { store_id: { in: existingIds } },
      data: { is_removed: true },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }
}
