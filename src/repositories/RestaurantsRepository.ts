import { EntityRepository, Repository } from 'typeorm';
import Restaurant from '../models/Restaurant';

@EntityRepository(Restaurant)
class RestaurantsRepository extends Repository<Restaurant> {

  // public create({
  //   name, photo, address, regularHoursStart, regularHoursEnd, specialHoursStart, specialHoursEnd,
  // }: CreateRestaurantDTO): Restaurant {
  //   const restaurant = new Restaurant({
  //     name,
  //     photo,
  //     address,
  //     regularHoursStart,
  //     regularHoursEnd,
  //     specialHoursStart,
  //     specialHoursEnd,
  //   });

  //   this.restaurants.push(restaurant);

  //   return restaurant;
  // }
}

export default RestaurantsRepository;
