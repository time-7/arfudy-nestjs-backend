import { Category } from '@domain/restaurant/enterprise/entities/value-objects/products';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class NutritionFactsDto {
  @IsInt()
  @ApiProperty()
  carbohydrate: number;

  @IsInt()
  @ApiProperty()
  protein: number;

  @IsInt()
  @ApiProperty()
  totalFat: number;

  @IsOptional()
  @ApiPropertyOptional()
  totalCalories: number;
}

class IngredientDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @ValidateNested()
  @Type(() => NutritionFactsDto)
  @ApiProperty({ type: () => NutritionFactsDto })
  nutritionFacts: NutritionFactsDto;
}

export class CreateProductRequestDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  @ApiProperty({ type: () => IngredientDto, isArray: true })
  ingredients: IngredientDto[];

  @IsOptional()
  @ValidateNested()
  @Type((body) => (body.object.nutritionFacts ? Object : NutritionFactsDto))
  @ApiPropertyOptional({ type: NutritionFactsDto })
  nutritionFacts?: NutritionFactsDto;

  @IsBoolean()
  @ApiProperty()
  has3dModel: boolean;

  @IsString()
  @ApiProperty()
  imageUrl: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  unityModelId: string;

  @IsEnum(Category)
  @ApiProperty({ enum: Category })
  category: Category;
}
