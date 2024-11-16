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
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { MESSAGES } from '../../utils/constants/message';
import {
  addMenuProdResponse,
  badRequestResponse,
  createMenuResponse,
  deleteMenuProdResponse,
  deleteMenuResponse,
  deleteMulMenuResponse,
  getAllMenuPaginationResponse,
  getAllMenuResponse,
  getMenuByIdResponse,
  getProdToMenuResponse,
  internalServerErrorResponse,
  notFoundResponse,
  unauthorizedResponse,
  updateMenuResponse,
} from '../../swagger/swagger.util';
import moment from 'moment';
import _ from 'lodash';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import { AuthenticationGuard } from '../../core/guards/auth.guard';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { UserRole } from '../../utils/constants/enums';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Get all banner using pagination
  @Get()
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.MENU.PAGINATION.MESSAGE_TITLE,
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
  @ApiResponse(getAllMenuPaginationResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getBanners(@Query() paginationDto: PaginationDto) {
    const result = await this.menuService.getMenuPagination(paginationDto);
    let { data, pagination } = result;
    let { currentPage, itemsPerPage, totalItems, totalPages } = pagination;
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.BANNER.GET_ALL,
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

  // Get all list of menu
  @Get('all')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.BANNER.GET_ALL.MESSAGE_TITLE,
  })
  @ApiResponse(getAllMenuResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(internalServerErrorResponse())
  async getAllBanner() {
    const result = await this.menuService.getAllMenu();
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.GET_ALL,
      data: result.map(item =>
        _.omit(item, ['is_removed', 'created_at', 'updated_at']),
      ),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get an existing banner by ID
  @Get(':id')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.MENU.GET_BY_ID.MESSAGE_TITLE,
  })
  @ApiResponse(getMenuByIdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async getBannerById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.menuService.getMenuById(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.GET_BY_ID,
      data: _.pick(result, ['menu_id', 'name', 'image', 'parent_id']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Create a new banner
  @ApiBearerAuth('authorization')
  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.MENU.CREATE.MESSAGE_TITLE,
  })
  @ApiResponse(createMenuResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async createBanner(@Body() createMenuDto: CreateMenuDto) {
    const result = await this.menuService.createMenu(createMenuDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.INSERT,
      data: _.pick(result, ['menu_id', 'name', 'image', 'parent_id']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Update an existing menu by ID
  @ApiBearerAuth('authorization')
  @Put(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.MENU.UPDATE.MESSAGE_TITLE,
  })
  @ApiResponse(updateMenuResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    const result = await this.menuService.updateMenu(id, updateMenuDto);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.UPDATE,
      data: _.pick(result, ['menu_id', 'name', 'image', 'parent_id']),
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Delete a banner by ID
  @ApiBearerAuth('authorization')
  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.MENU.DELETE.MESSAGE_TITLE,
  })
  @ApiResponse(deleteMenuResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
      MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deletepMenu(@Param('id', ParseIntPipe) id: number) {
    await this.menuService.deleteMenu(id);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.DELETE,
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
    summary: MESSAGES.API_MESSAGES.MENU.DELETE_ALL.MESSAGE_TITLE,
  })
  @ApiQuery({
    name: 'id',
    required: true,
    isArray: true,
    type: String,
    description: 'IDs of the banners to delete',
  })
  @ApiResponse(deleteMulMenuResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(
    notFoundResponse(
      MESSAGES.API_MESSAGES.MENU.DELETE_ALL.NOT_FOUND.DESC,
      MESSAGES.API_MESSAGES.MENU.DELETE_ALL.NOT_FOUND.MESSAGE,
    ),
  )
  @ApiResponse(internalServerErrorResponse())
  async deleteMultipleMenu(@Query('id') ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('No banner IDs provided');
    }
    await this.menuService.deleteMultipleMenu(ids);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.DELETE_ALL,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Add food to menu
  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post(':menuId/foods/:foodId')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.MENU.ADD_FOOD.MESSAGE_TITLE,
  })
  @ApiParam({ name: 'menuId', description: 'ID of the menu' })
  @ApiParam({ name: 'foodId', description: 'ID of the food item' })
  @ApiResponse(addMenuProdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async addFoodToMenu(
    @Param('menuId') menuId: number,
    @Param('foodId') foodId: number,
  ) {
    await this.menuService.addFoodToMenu(menuId, foodId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.ADD_FOOD,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Remove food from menu
  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Delete(':menuId/foods/:foodId')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.MENU.REMOVE_FOOD.MESSAGE_TITLE,
  })
  @ApiParam({ name: 'menuId', description: 'ID of the menu' })
  @ApiParam({ name: 'foodId', description: 'ID of the food item' })
  @ApiResponse(deleteMenuProdResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async removeFoodFromMenu(
    @Param('menuId') menuId: number,
    @Param('foodId') foodId: number,
  ) {
    await this.menuService.removeFoodToMenu(menuId, foodId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.REMOVE_FOOD,
      data: '',
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }

  // Get all food items in a menu
  @ApiBearerAuth('authorization')
  @UseGuards(AuthenticationGuard)
  @Get(':menuId/foods')
  @ApiOperation({
    summary: MESSAGES.API_MESSAGES.MENU.GET_PRODUCT.MESSAGE_TITLE,
  })
  @ApiParam({ name: 'menuId', description: 'ID of the menu' })
  @ApiResponse(getProdToMenuResponse())
  @ApiResponse(badRequestResponse())
  @ApiResponse(unauthorizedResponse())
  @ApiResponse(notFoundResponse())
  @ApiResponse(internalServerErrorResponse())
  async getMenuFoods(@Param('menuId') menuId: number) {
    const menuProdItems = await this.menuService.getMenuFoods(menuId);
    return {
      statusCode: HttpStatus.OK,
      message: MESSAGES.SUCCESS_MESSAGES.MENU.GET_PRODUCT,
      data: menuProdItems,
      dateTime: moment(new Date()).format('DD-MM-YYYYTHH:mm:ssSSS'),
    };
  }
}
