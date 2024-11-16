import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './products.service';
import { MESSAGES } from '../../utils/constants/message';
import {
  addImageProdResponse,
  badRequestResponse,
  createFoodResponse,
  deleteFoodResponse,
  deleteMulFoodResponse,
  getAllFoodPaginationResponse,
  getAllFoodResponse,
  getAllImageProdResponse,
  getFoodByIdResponse,
  internalServerErrorResponse,
  likeProdResponse,
  notFoundResponse,
  unauthorizedResponse,
  unLikeProdResponse,
  updateFoodResponse,
  updateImageProdResponse,
} from '../../swagger/swagger.util';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import moment from 'moment';
import _ from 'lodash';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRole } from '../../utils/constants/enums';
import {
  AddFoodImagesDto,
  CreateFoodDto,
  SearchFoodDto,
  UpdateFoodDto,
  UpdateFoodImageDto,
} from './dto/products.dto';
@ApiTags('Foods')
@Controller('foods')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  // Get all food using pagination
  @Get()
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.PAGINATION.MESSAGE_TITLE,
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
    description: 'Filter by food name (partial match)',
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
  @ApiResponse(getAllFoodPaginationResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getFoods(@Query() paginationDto: PaginationDto) {
    const result = await this.productService.getFoods(paginationDto);
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

  // Get all existing food
  @Get('all')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getAllFoodResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getAllFood() {
    const result = await this.productService.getAllFoods();
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.GET_ALL,
      data: result.map(item =>
        _.omit(item, ['is_removed', 'created_at', 'updated_at']),
      ),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Search food
  @Get('search')
  async searchFoods(@Query() searchFoodDto: SearchFoodDto) {
    const result = await this.productService.searchFoods(searchFoodDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.SEARCH,
      data: result.map(item =>
        _.omit(item, ['is_removed', 'created_at', 'updated_at']),
      ),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get an existing food by ID
  @Get(':id')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.GET_BY_ID.MESSAGE_TITLE,
  })
  @ApiResponse(getFoodByIdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getFoodById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.productService.getFoodById(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.GET_BY_ID,
      data: _.pick(result, [
        'food_id',
        'name',
        'slug',
        'price',
        'description',
        'store_id',
        'promotion_id',
        'stock_quantity',
        'is_available',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Create a new food
  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.CREATE.MESSAGE_TITLE,
  })
  @ApiResponse(createFoodResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async createFood(@Body() createFoodDto: CreateFoodDto) {
    const result = await this.productService.createFood(createFoodDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.INSERT,
      data: _.pick(result, [
        'food_id',
        'name',
        'slug',
        'price',
        'description',
        'store_id',
        'promotion_id',
        'stock_quantity',
        'is_available',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Update an existing food by ID
  @ApiBearerAuth('authorization')
  @Put(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.UPDATE.MESSAGE_TITLE,
  })
  @ApiResponse(updateFoodResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async updateFood(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodDto: UpdateFoodDto,
  ) {
    const result = await this.productService.updateFood(id, updateFoodDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.UPDATE,
      data: _.pick(result, [
        'food_id',
        'name',
        'slug',
        'price',
        'description',
        'store_id',
        'promotion_id',
        'stock_quantity',
        'is_available',
      ]),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete a food by ID
  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.DELETE.MESSAGE_TITLE,
  })
  @ApiResponse(deleteFoodResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteFood(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteFood(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.DELETE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete multiple food by IDs
  @ApiBearerAuth('authorization')
  @Delete('')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.DELETE_ALL.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the food to delete',
  })
  @ApiResponse(deleteMulFoodResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.API_MESSAGES.FOOD.DELETE_ALL.NOT_FOUND.DESC,
      MESSAGES.API_MESSAGES.FOOD.DELETE_ALL.NOT_FOUND.MESSAGE,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteMultipleFoods(@Query('id') ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No food IDs provided');
    }
    await this.productService.deleteMultipleFoods(ids);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.DELETE_ALL,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Add image to product
  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post(':food_id/images')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.ADD_IMAGE_PROD.MESSAGE_TITLE,
  })
  @ApiParam({
    name: 'food_id',
    type: Number,
    description: 'ID of the food item to add images to',
  })
  @ApiBody({
    description: 'Array of images to upload for the food item',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          image_url: { type: 'string', description: 'URL of the image' },
          is_primary: {
            type: 'boolean',
            description: 'Set true if this is the primary image',
          },
          description: {
            type: 'string',
            description: 'Description of the image',
          },
        },
      },
    },
  })
  @ApiResponse(addImageProdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async addFoodImages(
    @Param('food_id') food_id: number,
    @Body() images: AddFoodImagesDto[],
  ) {
    await this.productService.addFoodImages(food_id, images);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.ADD_IMG_TO_PROD,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Patch('images/:image_id')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.UPDATE_IMAGE_PROD.MESSAGE_TITLE,
  })
  @ApiParam({
    name: 'image_id',
    type: Number,
    description: 'ID of the image to update',
  })
  @ApiBody({
    description: 'Data for updating the image of a food item',
    schema: {
      type: 'object',
      properties: {
        image_url: { type: 'string', description: 'URL of the image' },
        is_primary: {
          type: 'boolean',
          description: 'Set true if this is the primary image',
        },
        description: {
          type: 'string',
          description: 'Description of the image',
        },
      },
    },
  })
  @ApiResponse(updateImageProdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.FOOD.IMAGES_ID_NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.FOOD.IMAGES_ID_NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async updateFoodImage(
    @Param('image_id') image_id: number,
    @Body() updateData: UpdateFoodImageDto,
  ) {
    await this.productService.updateFoodImage(image_id, updateData);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.UPDATE_IMG_TO_PROD,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @Get(':food_id/images')
  @ApiOperation({
    summary: 'Get list of images for a specific food item by food_id',
  })
  @ApiParam({
    name: 'food_id',
    type: Number,
    description: 'ID of the food item',
  })
  @ApiResponse(getAllImageProdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.FOOD.IMAGES_ID_NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.FOOD.IMAGES_ID_NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getImagesByFoodId(@Param('food_id', ParseIntPipe) food_id: number) {
    await this.productService.getImagesByFoodId(food_id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.UPDATE_IMG_TO_PROD,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard)
  @ApiParam({ name: 'foodId', description: 'ID of the food item' })
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.LIKE_PROD.MESSAGE_TITLE,
  })
  @Post('favorites/:foodId')
  @ApiResponse(likeProdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(internalServerErrorResponse())
  async likeFood(@Param('foodId') foodId: number, @Req() req) {
    const userId = req.user.id;
    await this.productService.likeFood(userId, foodId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.LIKE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard)
  @Delete('favorites/:foodId')
  @ApiParam({ name: 'foodId', description: 'ID of the food item' })
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.FOOD.UNLIKE_PROD.MESSAGE_TITLE,
  })
  @ApiResponse(unLikeProdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(internalServerErrorResponse())
  async unlikeFood(@Param('foodId') foodId: number, @Req() req) {
    const userId = req.user.id;
    await this.productService.unlikeFood(userId, foodId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.FOOD.UNLIKE,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
