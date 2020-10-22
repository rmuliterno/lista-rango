import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ProductsRepository from '../repositories/ProductsRepository';
import Product from '../models/Product';

interface Request {
  name: string;
  price: number;
  category: string;
  restaurant_id: string;
}

class CreateProductService {
  public async execute({
    name, price, category, restaurant_id,
  }: Request): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const checkProductExists = await productsRepository.findOne({
      where: { name, restaurant_id },
    });

    if (checkProductExists) {
      throw new AppError('Product already registered in this Restaurant');
    }

    const product = await productsRepository.create({
      name,
      price,
      category,
      restaurant_id,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
