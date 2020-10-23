import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ListRestaurantProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(id: string): Promise<Product[]> {
    const checkRestaurant = await this.restaurantsRepository.findById(id);

    if (!checkRestaurant) {
      throw new AppError('Restaurant not found!', 404);
    }

    const products = await this.productsRepository.findByRestaurant(id);

    if (!products) {
      throw new AppError('Error while getting all products!');
    }

    return products;
  }
}

export default ListRestaurantProductsService;
