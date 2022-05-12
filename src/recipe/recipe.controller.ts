import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CreateRecipeDto, EditRecipeDto } from './dto';
import { RecipeService } from './recipe.service';

@UseGuards(JwtGuard)
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Get()
  getRecipes(@GetUser('id') userId: number) {
    return this.recipeService.getRecipes(userId);
  }

  @Get(':id')
  getRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.getRecipeById(recipeId, userId);
  }

  @Post()
  createRecipe(@GetUser('id') userId: number, @Body() dto: CreateRecipeDto) {
    return this.recipeService.createRecipe(userId, dto);
  }

  @Patch(':id')
  editRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() dto: EditRecipeDto,
  ) {
    return this.recipeService.editRecipeById(userId, recipeId, dto);
  }

  @Delete(':id')
  deleteRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.deleteRecipeById(userId, recipeId);
  }
}
