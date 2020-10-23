import { uuid } from 'uuidv4';

import IRestaurantsRepository from '@modules/restaurants/repositories/IRestaurantsRepository';
import ICreateRestaurantDTO from '@modules/restaurants/dtos/ICreateRestaurantDTO';
import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';

class RestaurantsRepository implements IRestaurantsRepository {
  private restaurants: Restaurant[] = [];

  public async create(restaurantData: ICreateRestaurantDTO): Promise<Restaurant> {
    const restaurant = new Restaurant();

    Object.assign(restaurant, { id: uuid() }, restaurantData);

    this.restaurants.push(restaurant);

    return restaurant;
  }

  public async save(restaurant: Restaurant): Promise<Restaurant> {
    const findIndex = this.restaurants.findIndex(
      (findRestaurant) => findRestaurant.id === restaurant.id,
    );

    this.restaurants[findIndex] = restaurant;

    return restaurant;
  }

  public async findById(id: string): Promise<Restaurant | undefined> {
    const findRestaurant = this.restaurants.find((restaurant) => restaurant.id === id);

    return findRestaurant;
  }

  public async find(): Promise<Restaurant[]> {
    return this.restaurants;
  }

  public async delete(id: string): Promise<string> {
    const filteredRestaurants = this.restaurants.filter((restaurant) => restaurant.id === id);

    this.restaurants = filteredRestaurants;

    return 'Success!';
  }
}

export default RestaurantsRepository;
