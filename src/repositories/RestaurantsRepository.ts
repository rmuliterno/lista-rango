import Restaurant from '../models/Restaurant';

interface CreateRestaurantDTO {
  name: string;
  photo: string;
  address: string;
  regularHoursStart: Date;
  regularHoursEnd: Date;
  specialHoursStart: Date;
  specialHoursEnd: Date;
}

class RestaurantsRepository {
	private restaurants: Restaurant[];

	constructor() {
	  this.restaurants = [];
	}

	public create({
	  name, photo, address, regularHoursStart, regularHoursEnd, specialHoursStart, specialHoursEnd,
	}: CreateRestaurantDTO): Restaurant {
	  const restaurant = new Restaurant({
	    name,
	    photo,
	    address,
	    regularHoursStart,
	    regularHoursEnd,
	    specialHoursStart,
	    specialHoursEnd,
	  });

	  this.restaurants.push(restaurant);

	  return restaurant;
	}

	public all(): Restaurant[] {
	  return this.restaurants;
	}
}

export default RestaurantsRepository;
