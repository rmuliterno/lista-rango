import Restaurant from '../models/Restaurant';

class RestaurantsRepository {
	private restaurants: Restaurant[];

	constructor() {
	  this.restaurants = [];
	}

	public create(
	  name: string,
	  photo: string,
	  address: string,
	  regularHoursStart: Date,
	  regularHoursEnd: Date,
	  specialHoursStart: Date,
	  specialHoursEnd: Date,
	): Restaurant {
	  const restaurant = new Restaurant(
	    name,
	    photo,
	    address,
	    regularHoursStart,
	    regularHoursEnd,
	    specialHoursStart,
	    specialHoursEnd,
	  );

	  this.restaurants.push(restaurant);

	  return restaurant;
	}

	public all(): Restaurant[] {
	  return this.restaurants;
	}
}

export default RestaurantsRepository;
