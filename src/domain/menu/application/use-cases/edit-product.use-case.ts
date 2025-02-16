import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';
import { NutritionFacts } from '../../enterprise/entities/value-objects/nutrition-facts.value-object';
import { ProductsRepository } from '../repositories/products.repository';
import { Injectable } from '@nestjs/common';
import { EditProductRequestDto } from '@infra/http/dtos/edit-product.request.dto';
import { Product } from '../../enterprise/entities/products';

export class EditProductUseCaseRequest extends EditProductRequestDto {}

export type EditProductUseCaseResponse = {
  product: Product;
};

@Injectable()
export class EditProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    id,
    name,
    description,
    has3dModel,
    imageUrl,
    ingredients,
    nutritionFacts,
    price,
    unityModelId,
    category,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new ResourceNotFoundError();

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.has3dModel = has3dModel;
    product.imageUrl = imageUrl;
    product.ingredients = ingredients ?? product.ingredients;
    product.nutritionFacts = ingredients.length
      ? NutritionFacts.createFromIngredients(ingredients)
      : NutritionFacts.create({ ...nutritionFacts });
    product.price = price;
    product.unityModelId = unityModelId;
    product.category = category;

    await this.productsRepository.save(product);

    return { product };
  }
}
