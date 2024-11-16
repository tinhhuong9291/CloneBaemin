import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { CustomLoggerService } from '../../services/custom-logger.service';
import { MESSAGES } from '../../utils/constants/message';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import _ from 'lodash';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  private readonly logger = new CustomLoggerService();
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}

  // Get all list of menu
  async getAllMenu() {
    try {
      const menus = await this.prisma.menu.findMany();
      return menus;
    } catch (error) {
      this.logger.error(
        `Failed to get list of menu: ${error.message}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(MESSAGES.ERROR_MESSAGES.MENU.GET_ALL);
    }
  }

  // Get all menu using pagiantion
  async getMenuPagination(paginationDto: PaginationDto) {
    const { page, limit, name, created_at, sortField, sortOrder } =
      paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.MenuWhereInput = {
      is_removed: false,
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(created_at && { created_at: { gte: new Date(created_at) } }),
    };

    const orderBy: Prisma.MenuOrderByWithAggregationInput = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const menuList = await this.prisma.menu.findMany({
      skip: offset,
      take: limit,
      where: filters,
      orderBy: sortField ? orderBy : { created_at: 'desc' },
    });

    const totalItems = await this.prisma.menu.count({ where: filters });
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: menuList,
      pagination: {
        totalItems: totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  // Get an existing menu by id
  async getMenuById(id: number) {
    const menuItem = await this.prisma.menu.findUnique({
      where: { menu_id: id, is_removed: false },
    });
    if (!menuItem) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND);
    }
    return menuItem;
  }

  // Create a new banner
  async createMenu(createMenuDto: CreateMenuDto) {
    let { name, parent_id, image } = createMenuDto;
    const existingMenu = await this.prisma.menu.findFirst({
      where: { name, is_removed: false },
    });

    if (existingMenu) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.MENU.ALREADY_EXITST,
      );
    }

    if (parent_id !== '') {
      const existParentMenu = await this.prisma.menu.findFirst({
        where: { menu_id: Number(parent_id), is_removed: false },
      });
      if (!existParentMenu) {
        throw new BadRequestException(
          MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
        );
      }
    }

    return this.prisma.menu.create({
      data: {
        name,
        image,
        parent_id: parent_id === '' ? null : Number(parent_id),
      },
    });
  }

  // Update an existing menu
  async updateMenu(id: number, updateMenuDto: UpdateMenuDto) {
    let { parent_id, ...items } = updateMenuDto;
    const menuItem = await this.prisma.menu.findUnique({
      where: { menu_id: id, is_removed: false },
    });

    if (!menuItem) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND);
    }

    if (parent_id !== '') {
      const existParentMenu = await this.prisma.menu.findFirst({
        where: { menu_id: Number(parent_id), is_removed: false },
      });
      if (!existParentMenu) {
        throw new BadRequestException(
          MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND,
        );
      }
      if (id === Number(parent_id)) {
        throw new BadRequestException(
          MESSAGES.VALIDATION_MESSAGES.MENU.UPDATED_OWN_ID,
        );
      }
    }

    return this.prisma.menu.update({
      where: { menu_id: id },
      data: {
        ...items,
        parent_id: parent_id === '' ? null : Number(parent_id),
        updated_at: new Date().toISOString(),
      },
    });
  }

  // Delete a menu by ID
  async deleteMenu(id: number) {
    const menuItem = await this.prisma.menu.findUnique({
      where: { menu_id: +id, is_removed: false },
    });
    if (!menuItem) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.MENU.NOT_FOUND);
    }
    return this.prisma.menu.update({
      where: { menu_id: +id },
      data: { is_removed: true },
    });
  }

  // Delete multiple menu by ID
  async deleteMultipleMenu(ids: string | string[]): Promise<{
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

    const existingMenu = await this.prisma.menu.findMany({
      where: { menu_id: { in: uniqueIds } },
      select: { menu_id: true },
    });

    const existingIds = existingMenu.map(item => item.menu_id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following menu IDs were not found: ${notFoundIds.join(', ')}`,
      );
    }

    await this.prisma.menu.updateMany({
      where: { menu_id: { in: existingIds } },
      data: { is_removed: true },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }

  // Add food to menu
  async addFoodToMenu(menuId: number, foodId: number) {
    const existingMenuFood = await this.prisma.menuFood.findUnique({
      where: {
        menu_id_food_id: { menu_id: menuId, food_id: foodId },
      },
    });
    //Check menu existing in systems
    const existingMenu = await this.prisma.menu.findUnique({
      where: { menu_id: menuId, is_removed: false },
    });
    if (!existingMenu) {
      throw new NotFoundException(`Menu with ID ${menuId} not found.`);
    }

    // Check food existting in systems
    const existingFood = await this.prisma.food.findUnique({
      where: { food_id: +foodId, is_removed: false, is_available: true },
    });
    if (!existingFood) {
      throw new NotFoundException(`Food with ID ${foodId} not found.`);
    }
    // Check if food already exists in menu
    if (existingMenuFood) {
      throw new ConflictException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.FOOD_MENU_ALREADY_EXIST,
      );
    }

    return await this.prisma.menuFood.create({
      data: {
        food_id: foodId,
        menu_id: menuId,
      },
    });
  }

  // Remove food to menu
  async removeFoodToMenu(menuId: number, foodId: number) {
    const existingMenuFood = await this.prisma.menuFood.findUnique({
      where: {
        menu_id_food_id: { menu_id: menuId, food_id: foodId },
      },
    });
    //Check menu existing in systems
    const existingMenu = await this.prisma.menu.findUnique({
      where: { menu_id: menuId, is_removed: false },
    });
    if (!existingMenu) {
      throw new NotFoundException(`Menu with ID ${menuId} not found.`);
    }

    // Check food existting in systems
    const existingFood = await this.prisma.food.findUnique({
      where: { food_id: +foodId, is_removed: false, is_available: true },
    });
    if (!existingFood) {
      throw new NotFoundException(`Food with ID ${foodId} not found.`);
    }
    // Check if food already exists in menu
    if (!existingMenuFood) {
      throw new ConflictException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.FOOD_MENU_NOT_ALREADY_EXIST,
      );
    }

    return await this.prisma.menuFood.delete({
      where: {
        menu_id_food_id: { menu_id: menuId, food_id: foodId },
      },
    });
  }

  // Get all food items in a menu
  async getMenuFoods(menuId: number) {
    const menu = await this.prisma.menu.findUnique({
      where: { menu_id: menuId, is_removed: false },
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${menuId} not found`);
    }

    return await this.prisma.menuFood.findMany({
      where: { menu_id: menuId },
      include: { Food: true },
    });
  }
}
