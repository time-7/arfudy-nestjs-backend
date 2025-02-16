import { Entity } from '@core/entities/entity';
import { NutritionFacts } from './value-objects/nutrition-facts.value-object';
import { Ingredient } from './value-objects/ingredients.value-object';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { Category } from '@domain/restaurant/enterprise/entities/value-objects/products';

export interface ProductProps {
  name: string;
  description: string;
  has3dModel?: boolean;
  imageUrl?: string;
  ingredients: Ingredient[];
  nutritionFacts?: NutritionFacts;
  price: number;
  unityModelId?: string;
  isVisible?: boolean;
  category?: Category;
}

export class Product extends Entity<ProductProps> {
  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get has3dModel(): boolean {
    return this.props.has3dModel;
  }

  set has3dModel(has3dModel: boolean) {
    this.props.has3dModel = has3dModel;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  set imageUrl(imageUrl: string) {
    this.props.imageUrl = imageUrl;
  }

  get ingredients() {
    return this.props.ingredients;
  }

  set ingredients(ingredients: Ingredient[]) {
    this.props.ingredients = ingredients;
  }

  get nutritionFacts() {
    return this.props.nutritionFacts;
  }

  set nutritionFacts(nutritionFacts: NutritionFacts) {
    this.props.nutritionFacts = nutritionFacts;
  }

  get price() {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }

  get unityModelId() {
    return this.props.unityModelId;
  }

  set unityModelId(unityModelId: string) {
    this.props.unityModelId = unityModelId;
  }

  get isVisible(): boolean {
    return this.props.isVisible;
  }

  changeVisibility(): void {
    this.props.isVisible = !this.isVisible;
  }

  get category(): Category {
    return this.props.category;
  }

  set category(category: Category) {
    this.props.category = category;
  }

  static create(
    {
      name,
      description,
      has3dModel,
      imageUrl,
      ingredients,
      nutritionFacts,
      price,
      unityModelId,
      isVisible,
      category,
    }: ProductProps,
    id?: UniqueEntityId,
  ) {
    return new Product(
      {
        name,
        description,
        has3dModel: has3dModel ? has3dModel : false,
        imageUrl: imageUrl ?? null,
        ingredients,
        nutritionFacts: ingredients.length
          ? NutritionFacts.createFromIngredients(ingredients)
          : NutritionFacts.create({
              carbohydrate: nutritionFacts.carbohydrate,
              protein: nutritionFacts.protein,
              totalFat: nutritionFacts.totalFat,
            }),
        price,
        unityModelId,
        isVisible: isVisible ?? true,
        category: category ?? Category.FOOD,
      },
      id,
    );
  }
}
