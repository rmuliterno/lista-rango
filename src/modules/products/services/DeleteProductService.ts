import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    await this.productsRepository.delete(product.id);

    return 'Success!';
  }
}

export default DeleteProductService;
