import { getRepository, Repository } from 'typeorm';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICreateRestaurantDTO from '@modules/restaurants/dtos/ICreateRestaurantDTO';
import Restaurant from '../entities/Restaurant';

class RestaurantsRepository implements IRestaurantsRepository {
  private ormRepository: Repository<Restaurant>;

  constructor() {
    this.ormRepository = getRepository(Restaurant);
  }

  public async create(restaurantData: ICreateRestaurantDTO): Promise<Restaurant> {
    const restaurant = this.ormRepository.create(restaurantData);

    await this.ormRepository.save(restaurant);

    return restaurant;
  }

  public async save(restaurant: Restaurant): Promise<Restaurant> {
    return this.ormRepository.save(restaurant);
  }

  public async findById(id: string): Promise<Restaurant | undefined> {
    const restaurant = await this.ormRepository.findOne(id);

    return restaurant;
  }
}

export default RestaurantsRepository;
