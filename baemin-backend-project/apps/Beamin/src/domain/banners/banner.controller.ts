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
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { RolesGuard } from '../../core/guards/roles.guard';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { UserRole } from '../../utils/constants/enums';
import { Roles } from '../../core/decorators/roles.decorator';
import { CreateBannerDto, UpdateBannerDto } from './dto/banners.dto';
import { MESSAGES } from '../../utils/constants/message';
import _ from 'lodash';
import {
  badRequestResponse,
  createBannerResponse,
  deleteBannerResponse,
  getAllBannerPaginationResponse,
  getAllBannerResponse,
  getBannerByIdResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updateBannerResponse,
} from '../../swagger/swagger.util';
import moment from 'moment';
import { PaginationDto } from '../../core/dtos/pagination.dto';
@ApiTags('Banners')
@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  // Get all banner using pagination
  @Get()
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.BANNER.PAGINATION.MESSAGE_TITLE,
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
    description: 'Filter by banner name (partial match)',
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
  @ApiResponse(getAllBannerPaginationResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getBanners(@Query() paginationDto: PaginationDto) {
    const result = await this.bannerService.getBanners(paginationDto);
    let { data, pagination } = result;
    let { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.BANNER.GET_ALL,
      data: {
        items: data.map(item =>
          _.omit(item, [
            'is_removed',
            'created_at',
            'updated_at',
            'created_by',
          ]),
        ),
        page: currentPage,
        per_page: itemsPerPage,
        total_page: totalPages,
        total_items: totalItems,
      },
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get all existing banner
  @Get('all')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.BANNER.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getAllBannerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getAllBanner() {
    const result = await this.bannerService.getAllBanner();
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.BANNER.GET_ALL,
      data: result.map(item =>
        _.omit(item, ['is_removed', 'created_at', 'updated_at', 'created_by']),
      ),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get an existing banner by ID
  @Get(':id')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.BANNER.GET_BY_ID.MESSAGE_TITLE,
  })
  @ApiResponse(getBannerByIdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getBannerById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.bannerService.getBannerById(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.BANNER.GET_BY_ID,
      data: _.pick(result, ['id', 'name', 'slug', 'url', 'description']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Create a new banner
  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.BANNER.CREATE.MESSAGE_TITLE,
  })
  @ApiResponse(createBannerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async createBanner(@Body() createBannerDto: CreateBannerDto, @Req() req) {
    const userId = req.user.id;
    const result = await this.bannerService.createBanner(
      createBannerDto,
      userId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.BANNER.INSERT,
      data: _.pick(result, ['id', 'name', 'slug', 'url', 'description']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Update an existing banner by ID
  @ApiBearerAuth('authorization')
  @Put(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.BANNER.UPDATE.MESSAGE_TITLE,
  })
  @ApiResponse(updateBannerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    const result = await this.bannerService.updateBanner(id, updateBannerDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.BANNER.UPDATE,
      data: _.pick(result, ['id', 'name', 'slug', 'url', 'description']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete a banner by ID
  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.BANNER.DELETE.MESSAGE_TITLE,
  })
  @ApiResponse(deleteBannerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.BANNER.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    await this.bannerService.deleteBanner(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.BANNER.DELETE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete multiple banners by IDs
  @ApiBearerAuth('authorization')
  @Delete('')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.BANNER.DELETE_ALL.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the banners to delete',
  })
  @ApiResponse(deleteBannerResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.API_MESSAGES.BANNER.DELETE_ALL.NOT_FOUND.DESC,
      MESSAGES.API_MESSAGES.BANNER.DELETE_ALL.NOT_FOUND.MESSAGE,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteMultipleBanners(@Query('id') ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No banner IDs provided');
    }
    await this.bannerService.deleteMultipleBanners(ids);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.BANNER.DELETE_ALL,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
