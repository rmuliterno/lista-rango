import { EntityRepository, Repository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';

@EntityRepository(Product)
class ProductsRepository extends Repository<Product> {

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

export default ProductsRepository;
