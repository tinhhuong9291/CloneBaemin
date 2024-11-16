import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { CreateBannerDto, UpdateBannerDto } from './dto/banners.dto';
import { generateSlug } from '../../utils/helpers/slugify.helpers';
import { MESSAGES } from '../../utils/constants/message';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import { CustomLoggerService } from '../../services/custom-logger.service';

@Injectable()
export class BannerService {
  private readonly logger = new CustomLoggerService();
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Get all list of banners
  async getAllBanner() {
    const banner = await this.prisma.banner.findMany();
    return banner;
  }

  // Get all banner using pagiantion
  async getBanners(paginationDto: PaginationDto) {
    const { page, limit, name, created_at, sortField, sortOrder } =
      paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.BannerWhereInput = {
      is_removed: false,
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(created_at && { created_at: { gte: new Date(created_at) } }),
    };

    const orderBy: Prisma.BannerOrderByWithRelationInput = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const banners = await this.prisma.banner.findMany({
      skip: offset,
      take: limit,
      where: filters,
      orderBy: sortField ? orderBy : { created_at: 'desc' },
    });

    const totalBanners = await this.prisma.banner.count({ where: filters });
    const totalPages = Math.ceil(totalBanners / limit);

    return {
      data: banners,
      pagination: {
        totalItems: totalBanners,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  // Get an existing banner by id
  async getBannerById(id: number) {
    const banner = await this.prisma.banner.findUnique({
      where: { id, is_removed: false },
    });
    if (!banner) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
      );
    }
    return banner;
  }

  // Create a new banner
  async createBanner(createBannerDto: CreateBannerDto, userId: string) {
    const { name, url, description } = createBannerDto;
    const slugFormat = generateSlug(name);
    const existingBanner = await this.prisma.banner.findFirst({
      where: { slug: slugFormat, is_removed: false },
    });

    if (existingBanner) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.BANNER.ALREADY_EXITST,
      );
    }

    return this.prisma.banner.create({
      data: {
        name,
        slug: slugFormat,
        url,
        description,
        created_by: userId,
      },
    });
  }

  // Update an existing banner
  async updateBanner(id: number, updateBannerDto: UpdateBannerDto) {
    const banner = await this.prisma.banner.findUnique({
      where: { id, is_removed: false },
    });
    if (!banner) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
      );
    }

    let slug = '';
    let { name } = updateBannerDto;
    if (name) {
      slug = generateSlug(name);
    }

    return this.prisma.banner.update({
      where: { id },
      data: {
        ...updateBannerDto,
        ...(slug && { slug }),
        updated_at: new Date().toISOString(),
      },
    });
  }

  // Delete a banner by ID
  async deleteBanner(id: number) {
    const banner = await this.prisma.banner.findUnique({
      where: { id, is_removed: false },
    });
    if (!banner) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
      );
    }
    return this.prisma.banner.update({
      where: { id },
      data: { is_removed: true },
    });
  }

  // Delete multiple banner by id
  async deleteMultipleBanners(ids: string | string[]): Promise<{
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

    const existingBanners = await this.prisma.banner.findMany({
      where: { id: { in: uniqueIds } },
      select: { id: true },
    });

    const existingIds = existingBanners.map(item => item.id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following banner IDs were not found: ${notFoundIds.join(', ')}`,
      );
    }

    await this.prisma.banner.updateMany({
      where: { id: { in: existingIds } },
      data: { is_removed: true },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }
}
