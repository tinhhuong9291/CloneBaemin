import {
  Controller,
  Get,
  HttpStatus,
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
import { WishlistService } from './wishlist.service';
import {
  badRequestResponse,
  getWishListPaginationResponse,
  getWishListResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
} from '../../swagger/swagger.util';
import { MESSAGES } from '../../utils/constants/message';
import _ from 'lodash';
import moment from 'moment';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { PaginationWhishListDto } from '../../core/dtos/pagination.dto';

@ApiTags('Wishlists')
@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}
  // Get all list of wishlist
  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard)
  @Get('')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.WISHLIST.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getWishListResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async getWhishList(@Req() req) {
    const userId = req.user.id;
    const result = await this.wishlistService.getAllWhishlist(userId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.WISHLIST.GET_ALL,
      data: result.map(item =>
        _.omit(item, ['is_removed', 'created_at', 'updated_at']),
      ),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get all food using pagination
  @Get('pagination')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.WISHLIST.PAGINATION.MESSAGE_TITLE,
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
    name: 'added_at',
    required: false,
    type: String,
    description: 'Filter by creation date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'sortField',
    required: false,
    type: String,
    enum: ['food_id', 'added_at'],
    description: 'Field to sort by (food_id or added_at)',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Order of sorting (asc or desc)',
  })
  @ApiResponse(getWishListPaginationResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async getFoods(@Query() paginationDto: PaginationWhishListDto) {
    const result = await this.wishlistService.getWishListPagination(
      paginationDto,
    );
    let { data, pagination } = result;
    let { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.GET_ALL,
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
}
