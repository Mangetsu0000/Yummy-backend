import { IsOptional, IsString } from 'class-validator';

export class EditRecipeDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
