import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

@injectable()
class ListSingleRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(id: string): Promise<Restaurant | undefined> {
    const restaurant = await this.restaurantsRepository.findById(id);

    if (!restaurant) {
      throw new AppError('Restaurant not found!');
    }

    return restaurant;
  }
}

export default ListSingleRestaurantService;
