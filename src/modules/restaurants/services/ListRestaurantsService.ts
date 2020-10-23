import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';
import { inject, injectable } from 'tsyringe';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

@injectable()
class ListRestaurantsService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(): Promise<Restaurant[]> {
    const restaurants = this.restaurantsRepository.find();

    return restaurants;
  }
}

export default ListRestaurantsService;
