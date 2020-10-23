import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProductSaleService from '@modules/products/services/ProductSaleService';

export default class ProductsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      sale, salePrice, saleDescription, saleDays, saleStart, saleEnd,
    } = request.body;

    const { id } = request.params;

    const updateProductSale = container.resolve(ProductSaleService);

    const product = await updateProductSale.execute({
      id,
      sale,
      salePrice,
      saleDescription,
      saleDays,
      saleStart,
      saleEnd,
    });

    return response.json(product);
  }
}
