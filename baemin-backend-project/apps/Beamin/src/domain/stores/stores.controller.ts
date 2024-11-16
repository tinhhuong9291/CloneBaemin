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
import { StoreService } from './stores.service';
import { MESSAGES } from '../../utils/constants/message';
import {
  badRequestResponse,
  createStoreResponse,
  deleteMulStoreResponse,
  deleteStoreResponse,
  getAllStorePaginationResponse,
  getAllStoreResponse,
  getStoreByIdResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updateStoreResponse,
} from '../../swagger/swagger.util';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import _ from 'lodash';
import moment from 'moment';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { UserRole } from '../../utils/constants/enums';
import { Roles } from '../../core/decorators/roles.decorator';
import { CreateStoreDto, UpdateStoreDto } from './dto/stores.dto';

@ApiTags('Stores')
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  // Get all store using pagination
  @Get()
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.STORE.PAGINATION.MESSAGE_TITLE,
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
    description: 'Filter by store name (partial match)',
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
  @ApiResponse(getAllStorePaginationResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getStores(@Query() paginationDto: PaginationDto) {
    const result = await this.storeService.getStores(paginationDto);
    let { data, pagination } = result;
    let { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.STORE.GET_ALL,
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

  // Get all existing store
  @Get('all')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.STORE.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getAllStoreResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getAllStore() {
    const result = await this.storeService.getAllStore();
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.STORE.GET_ALL,
      data: result.map(item =>
        _.omit(item, ['is_removed', 'created_at', 'updated_at']),
      ),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get an existing stores by ID
  @ApiBearerAuth('authorization')
  @Get(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.STORE.GET_BY_ID.MESSAGE_TITLE,
  })
  @ApiResponse(getStoreByIdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getStoresById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.storeService.getStoreById(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.STORE.GET_BY_ID,
      data: _.pick(result, [
        'store_id',
        'store_name',
        'description',
        'address',
        'images',
        'phone',
        'email',
        'website',
        'opening_hours',
        'closing_hours',
        'rating',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Create a new stores
  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.STORE.CREATE.MESSAGE_TITLE,
  })
  @ApiResponse(createStoreResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    const result = await this.storeService.createStore(createStoreDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.STORE.INSERT,
      data: _.pick(result, [
        'store_id',
        'store_name',
        'address',
        'images',
        'phone',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Update an existing stores by ID
  @ApiBearerAuth('authorization')
  @Put(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.STORE.UPDATE.MESSAGE_TITLE,
  })
  @ApiResponse(updateStoreResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async updateStore(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    const result = await this.storeService.updateStore(id, updateStoreDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.STORE.UPDATE,
      data: _.pick(result, [
        'store_id',
        'store_name',
        'description',
        'address',
        'images',
        'phone',
        'email',
        'website',
        'opening_hours',
        'closing_hours',
        'rating',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete a stores by ID
  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.STORE.DELETE.MESSAGE_TITLE,
  })
  @ApiResponse(deleteStoreResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.STORE.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteStore(@Param('id', ParseIntPipe) id: number) {
    await this.storeService.deleteStore(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.STORE.DELETE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete multiple store by IDs
  @ApiBearerAuth('authorization')
  @Delete('')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.STORE.DELETE_ALL.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the stores to delete',
  })
  @ApiResponse(deleteMulStoreResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.API_MESSAGES.STORE.DELETE_ALL.NOT_FOUND.DESC,
      MESSAGES.API_MESSAGES.STORE.DELETE_ALL.NOT_FOUND.MESSAGE,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteMultipleStores(@Query('id') ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No store IDs provided');
    }
    await this.storeService.deleteMultipleStores(ids);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.STORE.DELETE_ALL,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
