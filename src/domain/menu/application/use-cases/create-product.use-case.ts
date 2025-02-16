import { Injectable } from '@nestjs/common';
import { Product } from '../../enterprise/entities/products';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductRequestDto } from '@infra/http/dtos/create-product.request.dto';

export interface CreateProductUseCaseRequest extends CreateProductRequestDto {}

interface CreateProductUseCaseResponse {
  product: Product;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute({
    description,
    ingredients,
    name,
    nutritionFacts,
    has3dModel,
    imageUrl,
    price,
    unityModelId,
    category,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    let product: Product = Product.create({
      name,
      description,
      nutritionFacts,
      ingredients,
      has3dModel,
      imageUrl,
      price,
      unityModelId,
      category,
    });

    product = await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
