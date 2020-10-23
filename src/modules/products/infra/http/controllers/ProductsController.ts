import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductService from '@modules/products/services/ListProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name, price, category, restaurant_id,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name, price, category, restaurant_id,
    });

    return response.json(product);
  }

  public async read(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;

    const listProduct = container.resolve(ListProductService);

    const product = await listProduct.execute(id);

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name, price, category,
    } = request.body;

    const { id } = request.params;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      name, price, category, id,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute(id);

    return response.json({ message: 'Product deleted successfully' });
  }
}
