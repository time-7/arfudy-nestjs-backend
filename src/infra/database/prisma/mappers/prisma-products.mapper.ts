import { Product as PrismaProduct, Prisma } from '@prisma/client';
import { Product } from '@domain/menu/enterprise/entities/products';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { Category } from '@domain/restaurant/enterprise/entities/value-objects/products';

export class PrismaProductsMapper {
  static toDomain(raw: PrismaProduct) {
    return Product.create(
      {
        ...raw,
        category: raw.category as Category,
      },
      UniqueEntityId.createFromRawId(raw.id),
    );
  }
  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      name: product.name,
      description: product.description,
      has3dModel: product.has3dModel,
      unityModelId: product.unityModelId,
      imageUrl: product.imageUrl,
      price: product.price,
      ingredients: product.ingredients,
      nutritionFacts: product.nutritionFacts,
      id: product.id.toString(),
      category: product.category,
    };
  }

  static toPrismaUpdate(product: Product): Prisma.ProductUpdateInput {
    return {
      name: product.name,
      description: product.description,
      has3dModel: product.has3dModel,
      unityModelId: product.unityModelId,
      imageUrl: product.imageUrl,
      price: product.price,
      ingredients: product.ingredients,
      nutritionFacts: product.nutritionFacts,
      isVisible: product.isVisible,
      category: product.category,
    };
  }
}
