import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListRestaurantProductsService from '@modules/products/services/ListRestaurantProductsService';

export default class ProductsController {
  public async read(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;

    const listProduct = container.resolve(ListRestaurantProductsService);

    const product = await listProduct.execute(id);

    return response.json(product);
  }
}
