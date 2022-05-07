import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [AuthModule, UserModule, RecipeModule],
})
export class AppModule {}
