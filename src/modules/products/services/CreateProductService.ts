import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  category: string;
  restaurant_id: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name, price, category, restaurant_id,
  }: IRequest): Promise<Product> {
    const checkProductExists = await this.productsRepository.findOne({ name, restaurant_id });

    if (checkProductExists) {
      throw new AppError('Product already registered in this Restaurant');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      category,
      restaurant_id,
    });

    return product;
  }
}

export default CreateProductService;
