import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto, EditRecipeDto } from './dto';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}
  getRecipes(userId: number) {}

  getAllRecipes() {
    return this.prisma.recipe.findMany();
  }

  getRecipeById(recipeId: number, userId: number) {
    return this.prisma.recipe.findFirst({
      where: {
        id: recipeId,
        userId,
      },
    });
  }

  async createRecipe(userId: number, dto: CreateRecipeDto) {
    const recipe = await this.prisma.recipe.create({
      data: {
        userId,
        ...dto,
      },
    });
    return recipe;
  }

  async editRecipeById(userId: number, recipeId: number, dto: EditRecipeDto) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    // check if user owns the bookmark
    if (!recipe || recipe.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteRecipeById(userId: number, recipeId: number) {
    const recipe = await this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });

    // check if user owns the bookmark
    if (!recipe || recipe.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });
  }
}
