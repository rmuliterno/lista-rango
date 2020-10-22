import { startOfHour, isEqual } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

interface Request {
  name: string;
  address: string;
  regularHoursStart: Date;
  regularHoursEnd: Date;
  specialHoursStart: Date;
  specialHoursEnd: Date;
}

class CreateRestaurantService {
  constructor(private restaurantsRepository: IRestaurantsRepository) {}

  public async execute({
    name, address, regularHoursStart, regularHoursEnd, specialHoursEnd, specialHoursStart,
  }: Request): Promise<Restaurant> {
    const parsedRegularHoursStartDate = startOfHour(regularHoursStart);
    const parsedRegularHoursEndDate = startOfHour(regularHoursEnd);
    const parsedSpecialHoursStartDate = startOfHour(specialHoursStart);
    const parsedSpecialHoursEndDate = startOfHour(specialHoursEnd);

    const isRegularHoursEqual = isEqual(parsedRegularHoursStartDate, parsedRegularHoursEndDate);

    if (isRegularHoursEqual) {
      throw new AppError('You cannot create a restaurant when the opening hour is the same as the closing hour on regular days');
    }

    const isSpecialHoursEqual = isEqual(parsedSpecialHoursStartDate, parsedSpecialHoursEndDate);

    if (isSpecialHoursEqual) {
      throw new AppError('You cannot create a restaurant when the opening hour is the same as the closing hour on special days');
    }

    const restaurant = this.restaurantsRepository.create({
      name,
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
