import { EditProductUseCase } from '@domain/menu/application/use-cases/edit-product.use-case';
import { Controller, Param, Body, Patch } from '@nestjs/common';
import { ProductNutritionValidationPipe } from '../pipes/product-nutrition-validation.pipe';
import { EditProductRequestDto } from '../dtos/edit-product.request.dto';
import { MongoIdValidationPipe } from '../pipes/mongo-id-validation.pipe';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EditedResponse } from '@core/responses/responses/edited.response';
import { ProductPresenter } from '../presenters/product.presenter';

type EditProductResponse = {
  data: ProductPresenter;
  message: string;
};

@Controller('products')
@ApiTags('Products')
export class EditProductController {
  constructor(private readonly updateProductUseCase: EditProductUseCase) {}

  @Patch(':id')
  @ApiOkResponse({ type: () => EditedResponse })
  async handle(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body(new ProductNutritionValidationPipe()) data: EditProductRequestDto,
  ): Promise<EditProductResponse> {
    const { product } = await this.updateProductUseCase.execute({
      id,
      ...data,
    });

    return {
      data: ProductPresenter.toHttp(product),
      message: 'Produto salvo com sucesso!',
    };
  }
}
