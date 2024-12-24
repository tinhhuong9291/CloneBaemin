import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Food } from '../models/food.model';
import { CreateFoodDto } from '../dto/create-food.dto';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async createFood(createFoodDto: CreateFoodDto): Promise<Food> {
    // Generate slug if not provided
    if (!createFoodDto.slug) {
      createFoodDto.slug = this.generateSlug(createFoodDto.name);
    }

    const createdFood = new this.foodModel(createFoodDto);
    return createdFood.save();
  }

  async searchFoods(query: {
    search?: string;
    tags?: string[];
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
  }): Promise<{ foods: Food[]; total: number }> {
    const { search, tags, minPrice, maxPrice, page = 1, limit = 10 } = query;

    const filterConditions: any = {};

    if (search) {
      filterConditions.$text = { $search: search };
    }

    if (tags && tags.length) {
      filterConditions.tags = { $in: tags };
    }

    if (minPrice || maxPrice) {
      filterConditions.price = {};
      if (minPrice) filterConditions.price.$gte = minPrice;
      if (maxPrice) filterConditions.price.$lte = maxPrice;
    }

    const foods = await this.foodModel
      .find(filterConditions)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.foodModel.countDocuments(filterConditions);

    return { foods, total };
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
