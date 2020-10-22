import Restaurant from '../infra/typeorm/entities/Restaurant';
import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';

export default interface IRestaurantsRepository {
  findById(id: string): Promise<Restaurant | undefined>;
  create(data: ICreateRestaurantDTO): Promise<Restaurant>;
  save(restaurant: Restaurant): Promise<Restaurant>;
// eslint-disable-next-line semi
};
