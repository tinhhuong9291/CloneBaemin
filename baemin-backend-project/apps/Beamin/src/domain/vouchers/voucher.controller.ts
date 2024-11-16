import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { VoucherService } from './voucher.service';
import { MESSAGES } from '../../utils/constants/message';
import {
  badRequestResponse,
  createVoucherResponse,
  deleteMulVoucherResponse,
  deleteVoucherResponse,
  getAllVoucherPaginationResponse,
  getAllVoucherResponse,
  getVoucherByIdResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updateVoucherResponse,
} from '../../swagger/swagger.util';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import _ from 'lodash';
import moment from 'moment';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRole } from '../../utils/constants/enums';
import { CreateVoucherDto, UpdateVoucherDto } from './dto/voucher.dto';

@ApiTags('Vouchers')
@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  // Get all voucher using pagination
  @ApiBearerAuth('authorization')
  @Get()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.VOUCHER.PAGINATION.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by voucher name (partial match)',
  })
  @ApiQuery({
    name: 'created_at',
    required: false,
    type: String,
    description: 'Filter by creation date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'sortField',
    required: false,
    type: String,
    enum: ['name', 'created_at'],
    description: 'Field to sort by (name or created_at)',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Order of sorting (asc or desc)',
  })
  @ApiResponse(getAllVoucherPaginationResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getVouchers(@Query() paginationDto: PaginationDto) {
    const result = await this.voucherService.getVouchers(paginationDto);
    let { data, pagination } = result;
    let { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.VOUCHER.GET_ALL,
      data: {
        items: data.map(item =>
          _.omit(item, ['is_removed', 'created_at', 'updated_at']),
        ),
        page: currentPage,
        per_page: itemsPerPage,
        total_page: totalPages,
        total_items: totalItems,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get all existing voucher
  @ApiBearerAuth('authorization')
  @Get('all')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.VOUCHER.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getAllVoucherResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getAllVoucher() {
    const result = await this.voucherService.getAllVouchers();
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.VOUCHER.GET_ALL,
      data: result.map(item =>
        _.omit(item, ['is_removed', 'created_at', 'updated_at']),
      ),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get an existing vouchers by ID
  @ApiBearerAuth('authorization')
  @Get(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.VOUCHER.GET_BY_ID.MESSAGE_TITLE,
  })
  @ApiResponse(getVoucherByIdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getVoucherById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.voucherService.getVoucherById(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.VOUCHER.GET_BY_ID,
      data: result,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Create a new voucher
  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.VOUCHER.CREATE.MESSAGE_TITLE,
  })
  @ApiResponse(createVoucherResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async createVoucher(@Body() createVoucherDto: CreateVoucherDto) {
    const result = await this.voucherService.createVoucher(createVoucherDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.VOUCHER.INSERT,
      data: result,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Update an existing voucher by ID
  @ApiBearerAuth('authorization')
  @Put(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.VOUCHER.UPDATE.MESSAGE_TITLE,
  })
  @ApiResponse(updateVoucherResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async updateVouchers(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    const result = await this.voucherService.updateVoucher(
      id,
      updateVoucherDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.VOUCHER.UPDATE,
      data: result,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete a voucher by ID
  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.VOUCHER.DELETE.MESSAGE_TITLE,
  })
  @ApiResponse(deleteVoucherResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.VOUCHER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteVoucher(@Param('id', ParseIntPipe) id: number) {
    await this.voucherService.deleteVoucher(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.VOUCHER.DELETE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete multiple voucher by IDs
  @ApiBearerAuth('authorization')
  @Delete('')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.VOUCHER.DELETE_ALL.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the vouchers to delete',
  })
  @ApiResponse(deleteMulVoucherResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.API_MESSAGES.VOUCHER.DELETE_ALL.NOT_FOUND.DESC,
      MESSAGES.API_MESSAGES.VOUCHER.DELETE_ALL.NOT_FOUND.MESSAGE,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteMultipleVouchers(@Query('id') ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No voucher IDs provided');
    }
    await this.voucherService.deleteMultipleVouchers(ids);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.VOUCHER.DELETE_ALL,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
