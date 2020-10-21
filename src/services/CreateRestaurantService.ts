import { startOfHour, isEqual } from 'date-fns';

import Restaurant from '../models/Restaurant';
import RestaurantsRepository from '../repositories/RestaurantsRepository';

interface Request {
  name: string;
  photo: string;
  address: string;
  regularHoursStart: Date;
  regularHoursEnd: Date;
  specialHoursStart: Date;
  specialHoursEnd: Date;
}

class CreateRestaurantService {
  private restaurantsRepository: RestaurantsRepository;

  constructor(restaurantsRepository: RestaurantsRepository) {
    this.restaurantsRepository = restaurantsRepository;
  }

  public execute({
    name, photo, address, regularHoursStart, regularHoursEnd, specialHoursEnd, specialHoursStart,
  }: Request): Restaurant {
    const parsedRegularHoursStartDate = startOfHour(regularHoursStart);
    const parsedRegularHoursEndDate = startOfHour(regularHoursEnd);
    const parsedSpecialHoursStartDate = startOfHour(specialHoursStart);
    const parsedSpecialHoursEndDate = startOfHour(specialHoursEnd);

    const isRegularHoursEqual = isEqual(parsedRegularHoursStartDate, parsedRegularHoursEndDate);

    if (isRegularHoursEqual) {
      throw Error('You cannot create a restaurant when the opening hour is the same as the closing hour on regular days');
    }

    const isSpecialHoursEqual = isEqual(parsedSpecialHoursStartDate, parsedSpecialHoursEndDate);

    if (isSpecialHoursEqual) {
      throw Error('You cannot create a restaurant when the opening hour is the same as the closing hour on special days');
    }

    const restaurant = this.restaurantsRepository.create({
      name,
      photo,
      address,
      regularHoursStart: parsedRegularHoursStartDate,
      regularHoursEnd: parsedRegularHoursEndDate,
      specialHoursStart: parsedSpecialHoursStartDate,
      specialHoursEnd: parsedSpecialHoursEndDate,
    });

    return restaurant;
  }
}

export default CreateRestaurantService;
