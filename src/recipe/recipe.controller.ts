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
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Get()
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }
  @UseGuards(JwtGuard)
  @Get()
  getRecipes(@GetUser('id') userId: number) {
    return this.recipeService.getRecipes(userId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.getRecipeById(recipeId, userId);
  }

  @UseGuards(JwtGuard)
  @Post()
  createRecipe(@GetUser('id') userId: number, @Body() dto: CreateRecipeDto) {
    return this.recipeService.createRecipe(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
    @Body() dto: EditRecipeDto,
  ) {
    return this.recipeService.editRecipeById(userId, recipeId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteRecipeById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) recipeId: number,
  ) {
    return this.recipeService.deleteRecipeById(userId, recipeId);
  }
}
