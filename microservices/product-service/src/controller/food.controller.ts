import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FoodService } from '../services/food.service';
import { CreateFoodDto } from '../dto/create-food.dto';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @Get('/search')
  async searchFoods(
    @Query('search') search?: string,
    @Query('tags') tags?: string[],
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.foodService.searchFoods({
      search,
      tags,
      minPrice,
      maxPrice,
      page,
      limit,
    });
  }
}
