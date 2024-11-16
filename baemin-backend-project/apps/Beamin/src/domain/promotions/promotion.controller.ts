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
import { PromotionService } from './promotion.service';
import { MESSAGES } from '../../utils/constants/message';
import {
  badRequestResponse,
  createPromotionResponse,
  deleteMulPromotionResponse,
  deletePromotionResponse,
  getAllPromotionPaginationResponse,
  getAllPromotionResponse,
  getPromotionByIdResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updatePromotionResponse,
} from '../../swagger/swagger.util';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import moment from 'moment';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRole } from '../../utils/constants/enums';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import _ from 'lodash';
import { CreatePromotionDto, UpdatePromotionDto } from './dto/promotion.dto';

@ApiTags('Promotions')
@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  // Get all promotion using pagination
  @Get()
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PROMOTION.PAGINATION.MESSAGE_TITLE,
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
    description: 'Filter by promotion name (partial match)',
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
  @ApiResponse(getAllPromotionPaginationResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getPromotions(@Query() paginationDto: PaginationDto) {
    const result = await this.promotionService.getPromotionPagination(
      paginationDto,
    );
    let { data, pagination } = result;
    let { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PROMOTION.GET_ALL,
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

  // Get all existing promotion
  @Get('all')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PROMOTION.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getAllPromotionResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getAllPromotion() {
    const result = await this.promotionService.getAllPromotion();
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PROMOTION.GET_ALL,
      data: result.map(item =>
        _.omit(item, ['is_removed', 'created_at', 'updated_at']),
      ),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get an existing promotion by ID
  @Get(':id')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PROMOTION.GET_BY_ID.MESSAGE_TITLE,
  })
  @ApiResponse(getPromotionByIdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getPromotionById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.promotionService.getPromotionById(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PROMOTION.GET_BY_ID,
      data: _.pick(result, [
        'promotion_id',
        'discount',
        'description',
        'start_at',
        'end_at',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Create a new promotion
  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PROMOTION.CREATE.MESSAGE_TITLE,
  })
  @ApiResponse(createPromotionResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
    const result = await this.promotionService.createPromotion(
      createPromotionDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PROMOTION.INSERT,
      data: _.pick(result, [
        'promotion_id',
        'discount',
        'description',
        'start_at',
        'end_at',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Update an existing promotion by ID
  @ApiBearerAuth('authorization')
  @Put(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PROMOTION.UPDATE.MESSAGE_TITLE,
  })
  @ApiResponse(updatePromotionResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async updatePromotion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    const result = await this.promotionService.updatePromotion(
      id,
      updatePromotionDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PROMOTION.UPDATE,
      data: _.pick(result, [
        'promotion_id',
        'discount',
        'description',
        'start_at',
        'end_at',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete a promotion by ID
  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PROMOTION.DELETE.MESSAGE_TITLE,
  })
  @ApiResponse(deletePromotionResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.PROMOTIONS.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deletePromotion(@Param('id', ParseIntPipe) id: number) {
    await this.promotionService.deletePromotion(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PROMOTION.DELETE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete multiple promotion by IDs
  @ApiBearerAuth('authorization')
  @Delete('')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.PROMOTION.DELETE_ALL.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the promotion to delete',
  })
  @ApiResponse(deleteMulPromotionResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.API_MESSAGES.PROMOTION.DELETE_ALL.NOT_FOUND.DESC,
      MESSAGES.API_MESSAGES.PROMOTION.DELETE_ALL.NOT_FOUND.MESSAGE,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteMultiplePromotions(@Query('id') ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No promotion IDs provided');
    }
    await this.promotionService.deleteMultiplePromotions(ids);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.PROMOTION.DELETE_ALL,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
