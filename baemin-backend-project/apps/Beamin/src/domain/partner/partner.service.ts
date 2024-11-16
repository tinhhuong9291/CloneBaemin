import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { CustomLoggerService } from '../../services/custom-logger.service';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import { MESSAGES } from '../../utils/constants/message';
import { CreatePartnerDto, UpdatePartnerDto } from './dto/partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Get all list of shipping partners
  async getAllPartner() {
    const shippingPartners = await this.prisma.shippingPartner.findMany();
    return shippingPartners;
  }

  // Get all shipping partners using pagiantion
  async getPartnerPagination(paginationDto: PaginationDto) {
    const { page, limit, name, created_at, sortField, sortOrder } =
      paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.ShippingPartnerWhereInput = {
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(created_at && { created_at: { gte: new Date(created_at) } }),
    };

    const orderBy: Prisma.ShippingPartnerOrderByWithAggregationInput = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const partnerList = await this.prisma.shippingPartner.findMany({
      skip: offset,
      take: limit,
      where: filters,
      orderBy: sortField ? orderBy : { created_at: 'desc' },
    });

    const totalItems = await this.prisma.shippingPartner.count({
      where: filters,
    });
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: partnerList,
      pagination: {
        totalItems: totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  // Get an existing shipping partners by id
  async getShippingPartnerById(id: number) {
    const shippingPartnerItem = await this.prisma.shippingPartner.findUnique({
      where: { partner_id: +id },
    });
    if (!shippingPartnerItem) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
      );
    }
    return shippingPartnerItem;
  }

  // Create a new shipping partner
  async createShippingPartner(createPartnerDto: CreatePartnerDto) {
    let { partner_name, service_fee } = createPartnerDto;
    const existingMenu = await this.prisma.shippingPartner.findFirst({
      where: { partner_name },
    });

    if (existingMenu) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.PARTNER.ALREADY_EXITST,
      );
    }

    return this.prisma.shippingPartner.create({
      data: {
        partner_name,
        service_fee,
      },
    });
  }

  // Update an existing shipping partner
  async updateShippingPartner(id: number, updatePartnerDto: UpdatePartnerDto) {
    const shippingPartnerItem = await this.prisma.shippingPartner.findUnique({
      where: { partner_id: +id },
    });

    if (!shippingPartnerItem) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
      );
    }

    return this.prisma.shippingPartner.update({
      where: { partner_id: +id },
      data: {
        ...updatePartnerDto,
        updated_at: new Date().toISOString(),
      },
    });
  }

  // Delete a shipping partner by ID
  async deleteShippingPartner(id: number) {
    const shippingPartnerItem = await this.prisma.shippingPartner.findUnique({
      where: { partner_id: +id },
    });
    if (!shippingPartnerItem) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.PARTNER.NOT_FOUND,
      );
    }
    return this.prisma.shippingPartner.delete({
      where: { partner_id: +id },
    });
  }

  // Delete multiple shipping partner by ID
  async deleteMulShippingPartner(ids: string | string[]): Promise<{
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

    const existingMenu = await this.prisma.shippingPartner.findMany({
      where: { partner_id: { in: uniqueIds } },
      select: { partner_id: true },
    });

    const existingIds = existingMenu.map(item => item.partner_id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following shipping partner IDs were not found: ${notFoundIds.join(
          ', ',
        )}`,
      );
    }

    await this.prisma.shippingPartner.deleteMany({
      where: { partner_id: { in: existingIds } },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }
}
