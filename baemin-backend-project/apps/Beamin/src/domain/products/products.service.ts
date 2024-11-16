import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../../database/database.service';
import { PaginationDto } from '../../core/dtos/pagination.dto';
import { Prisma } from '@prisma/client';
import { MESSAGES } from '../../utils/constants/message';
import { generateSlug } from '../../utils/helpers/slugify.helpers';
import {
  AddFoodImagesDto,
  CreateFoodDto,
  SearchFoodDto,
  UpdateFoodDto,
  UpdateFoodImageDto,
} from './dto/products.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {}
  // Get all list of food
  async getAllFoods() {
    const foods = await this.prisma.food.findMany({
      where: {
        is_removed: false,
        is_available: true,
      },
      select: {
        food_id: true,
        name: true,
        slug: true,
        price: true,
        description: true,
        stock_quantity: true,
        Store: true,
        Promotion: true,
        images: true,
      },
    });
    return foods;
  }

  // Get all food using pagiantion
  async getFoods(paginationDto: PaginationDto) {
    const { page, limit, name, created_at, sortField, sortOrder } =
      paginationDto;
    const offset = (page - 1) * limit;

    const filters: Prisma.FoodWhereInput = {
      is_removed: false,
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(created_at && { created_at: { gte: new Date(created_at) } }),
    };

    const orderBy: Prisma.FoodOrderByWithRelationInput = {};
    if (sortField) {
      orderBy[sortField] = sortOrder || 'asc';
    }

    const foods = await this.prisma.food.findMany({
      skip: offset,
      take: limit,
      where: filters,
      orderBy: sortField ? orderBy : { created_at: 'desc' },
      include: {
        Store: true,
        Promotion: true,
        images: true,
      },
    });

    const totalFoods = await this.prisma.food.count({ where: filters });
    const totalPages = Math.ceil(totalFoods / limit);

    return {
      data: foods,
      pagination: {
        totalItems: totalFoods,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  }

  // Get an existing food by id
  async getFoodById(id: number) {
    const foodItem = await this.prisma.food.findUnique({
      where: { food_id: +id, is_removed: false },
      include: {
        Store: true,
        Promotion: true,
        images: true,
      },
    });
    if (!foodItem || foodItem.is_removed) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND);
    }
    return foodItem;
  }

  // Create a new food
  async createFood(createFoodDto: CreateFoodDto) {
    const { name, store_id, promotion_id, ...items } = createFoodDto;
    const slugFormat = generateSlug(name);
    const existingFood = await this.prisma.food.findFirst({
      where: { slug: slugFormat, is_removed: false, is_available: true },
    });
    const existingStore = await this.prisma.store.findUnique({
      where: { store_id, is_removed: false },
    });
    const existingPromotion = await this.prisma.promotion.findUnique({
      where: { promotion_id, is_removed: false },
    });

    if (store_id && !existingStore) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.STORE_NOT_FOUND,
      );
    }

    if (promotion_id && !existingPromotion) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.PROMOTION_NOT_FOUND,
      );
    }

    if (existingFood) {
      throw new BadRequestException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.ALREADY_EXIST,
      );
    }

    return this.prisma.food.create({
      data: {
        name,
        slug: slugFormat,
        store_id,
        promotion_id,
        ...items,
      },
    });
  }

  // Update an existing food
  async updateFood(id: number, updateFoodDto: UpdateFoodDto) {
    let { promotion_id, store_id, ...items } = updateFoodDto;
    const food = await this.prisma.food.findUnique({
      where: { food_id: +id, is_removed: false, is_available: true },
    });
    if (!food) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND);
    }

    const existingStore = await this.prisma.store.findUnique({
      where: { store_id, is_removed: false },
    });

    const existingPromotion = await this.prisma.promotion.findUnique({
      where: { promotion_id, is_removed: false },
    });

    if (store_id && !existingStore) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.STORE_NOT_FOUND,
      );
    }

    if (promotion_id && !existingPromotion) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.PROMOTION_NOT_FOUND,
      );
    }

    let slug = '';
    let { name } = updateFoodDto;
    if (name) {
      slug = generateSlug(name);
    }

    return this.prisma.food.update({
      where: { food_id: +id },
      data: {
        promotion_id,
        store_id,
        ...items,
        ...(slug && { slug }),
        updated_at: new Date().toISOString(),
      },
    });
  }

  // Delete a food by ID
  async deleteFood(id: number) {
    const food = await this.prisma.food.findUnique({
      where: { food_id: +id, is_removed: false, is_available: true },
    });
    if (!food) {
      throw new NotFoundException(MESSAGES.VALIDATION_MESSAGES.FOOD.NOT_FOUND);
    }
    return this.prisma.food.update({
      where: { food_id: +id },
      data: { is_removed: true },
    });
  }

  // Delete multiple food by id
  async deleteMultipleFoods(ids: string | string[]): Promise<{
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

    const existingFoods = await this.prisma.food.findMany({
      where: { food_id: { in: uniqueIds }, is_available: true },
      select: { food_id: true },
    });

    const existingIds = existingFoods.map(item => item.food_id);
    const notFoundIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `The following food IDs were not found: ${notFoundIds.join(', ')}`,
      );
    }

    await this.prisma.food.updateMany({
      where: { food_id: { in: existingIds }, is_available: true },
      data: { is_removed: true },
    });

    return {
      deletedIds: existingIds,
      notFoundIds,
      duplicateIds,
    };
  }

  // Search food
  async searchFoods(searchFoodDto: SearchFoodDto) {
    const { name, description } = searchFoodDto;

    const where: any = { is_removed: false, is_available: true };

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (description) {
      where.description = { contains: description, mode: 'insensitive' };
    }

    return await this.prisma.food.findMany({
      where,
      include: {
        Store: true,
        Promotion: true,
      },
    });
  }

  // Function to add images to a food item
  async addFoodImages(food_id: number, images: AddFoodImagesDto[]) {
    const food = await this.prisma.food.findUnique({
      where: { food_id, is_removed: false, is_available: true },
    });
    if (!food) {
      throw new NotFoundException(`Food with ID ${food_id} not found.`);
    }

    const createdImages = await this.prisma.foodImage.createMany({
      data: images.map(image => ({
        food_id,
        image_url: image.image_url,
        description: image.description,
        is_primary: image.is_primary || false,
      })),
    });

    return {
      createdImages,
    };
  }

  // Update a specific image of a food item
  async updateFoodImage(image_id: number, updateData: UpdateFoodImageDto) {
    const existingImage = await this.prisma.foodImage.findUnique({
      where: { image_id },
    });
    if (!existingImage) {
      throw new NotFoundException(`Image with ID ${image_id} not found.`);
    }

    let { image_url, description, is_primary } = updateData;

    const updatedImage = await this.prisma.foodImage.update({
      where: { image_id },
      data: {
        image_url,
        description,
        is_primary,
      },
    });

    if (is_primary) {
      await this.prisma.foodImage.updateMany({
        where: {
          food_id: existingImage.food_id,
          image_id: { not: image_id },
        },
        data: { is_primary: false },
      });
    }

    return {
      updatedImage,
    };
  }

  // Get all image by food id
  async getImagesByFoodId(food_id: number) {
    const existingFood = await this.prisma.food.findUnique({
      where: { food_id },
    });

    if (!existingFood) {
      throw new NotFoundException(`Food with ID ${food_id} not found.`);
    }

    const images = await this.prisma.foodImage.findMany({
      where: { food_id },
      orderBy: { created_at: 'desc' },
    });

    if (!images.length) {
      throw new NotFoundException(
        `No images found for food with ID ${food_id}`,
      );
    }

    return images;
  }

  // Like (Add to favorites)
  async likeFood(userId: string, foodId: number) {
    const existingFavorite = await this.prisma.favoriteFood.findUnique({
      where: {
        user_id_food_id: { user_id: userId, food_id: foodId },
      },
    });
    //Check user existing in systems
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId, status: false },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Check food existting in systems
    const existingFood = await this.prisma.food.findUnique({
      where: { food_id: +foodId, is_removed: false, is_available: true },
    });
    if (!existingFood) {
      throw new NotFoundException(`Food with ID ${foodId} not found.`);
    }
    // Check if food already exists in favorites
    if (existingFavorite) {
      throw new ConflictException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.FOOD_FAVORITE_ALREADY_EXIST,
      );
    }

    return await this.prisma.favoriteFood.create({
      data: {
        food_id: foodId,
        user_id: userId,
      },
    });
  }

  // Unlike (Remove from favorites)
  async unlikeFood(userId: string, foodId: number) {
    const favorite = await this.prisma.favoriteFood.findUnique({
      where: {
        user_id_food_id: { user_id: userId, food_id: foodId },
      },
    });

    //Check user existing in systems
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId, status: false },
    });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    // Check food existting in systems
    const existingFood = await this.prisma.food.findUnique({
      where: { food_id: +foodId, is_removed: false, is_available: true },
    });
    if (!existingFood) {
      throw new NotFoundException(`Food with ID ${foodId} not found.`);
    }
    // Check if the food is in favorites
    if (!favorite) {
      throw new NotFoundException(
        MESSAGES.VALIDATION_MESSAGES.FOOD.FOOD_FAVORITE_NOT_ALREADY_EXIST,
      );
    }

    return await this.prisma.favoriteFood.delete({
      where: {
        user_id_food_id: { user_id: userId, food_id: foodId },
      },
    });
  }
}
