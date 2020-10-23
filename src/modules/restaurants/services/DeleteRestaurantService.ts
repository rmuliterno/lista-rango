import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

@injectable()
class DeleteRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(id: string): Promise<string> {
    const restaurant = await this.restaurantsRepository.findById(id);

    if (!restaurant) {
      throw new AppError('Restaurant not found!', 404);
    }

    await this.restaurantsRepository.delete(restaurant.id);

    return 'Success!';
  }
}

export default DeleteRestaurantService;
