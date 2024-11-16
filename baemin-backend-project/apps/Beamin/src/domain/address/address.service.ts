import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DatabaseService } from '../../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const { address_line1, city, postal_code } = createAddressDto;
    const existingAddress = await this.prisma.address.findFirst({
      where: {
        address_line1,
        city,
        postal_code,
        is_removed: false,
      },
    });

    if (existingAddress) {
      throw new BadRequestException('Address already exists');
    }

    return this.prisma.address.create({
      data: createAddressDto,
    });
  }

  async getAddresses(paginationDto: PaginationDto) {
    const { page, limit, name, created_at, sortField, sortOrder } =
      paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.AddressWhereInput = {
      is_removed: false,

      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(created_at && { created_at: { gte: new Date(created_at) } }),
    };

    const orderBy: Prisma.AddressOrderByWithRelationInput = {};

    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const addresses = await this.prisma.address.findMany({
      skip: offset,
      take: limit,

      where: filters,

      orderBy: sortField ? orderBy : { created_at: 'desc' },
    });

    const totalAddresses = await this.prisma.address.count({ where: filters });

    const totalPages = Math.ceil(totalAddresses / limit);

    return {
      data: addresses,

      pagination: {
        totalItems: totalAddresses,

        totalPages,

        currentPage: page,

        itemsPerPage: limit,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.prisma.address.findUnique({
      where: { address_id: +id, is_removed: false },
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return await this.prisma.address.update({
      where: { address_id: +id },

      data: updateAddressDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
