import { startOfHour, isEqual } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';
import { inject, injectable } from 'tsyringe';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

interface Request {
  id: string;
  name: string;
  address: string;
  regularHoursStart: Date;
  regularHoursEnd: Date;
  specialHoursStart: Date;
  specialHoursEnd: Date;
}

@injectable()
class UpdateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({
    id, name, address, regularHoursStart, regularHoursEnd, specialHoursEnd, specialHoursStart,
  }: Request): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findById(id);

    if (!restaurant) {
      throw new AppError('Restaurant not found!', 404);
    }

    const parsedRegularHoursStartDate = startOfHour(regularHoursStart);
    const parsedRegularHoursEndDate = startOfHour(regularHoursEnd);
    const parsedSpecialHoursStartDate = startOfHour(specialHoursStart);
    const parsedSpecialHoursEndDate = startOfHour(specialHoursEnd);

    const isRegularHoursEqual = isEqual(parsedRegularHoursStartDate, parsedRegularHoursEndDate);

    if (isRegularHoursEqual) {
      throw new AppError(
        'You cannot create a restaurant when the opening hour is the same as the closing hour on regular days',
      );
    }

    const isSpecialHoursEqual = isEqual(parsedSpecialHoursStartDate, parsedSpecialHoursEndDate);

    if (isSpecialHoursEqual) {
      throw new AppError(
        'You cannot create a restaurant when the opening hour is the same as the closing hour on special days',
      );
    }

    Object.assign(restaurant, {
      name,
      address,
      regularHoursStart: parsedRegularHoursStartDate,
      regularHoursEnd: parsedRegularHoursEndDate,
      specialHoursStart: parsedSpecialHoursStartDate,
      specialHoursEnd: parsedSpecialHoursEndDate,
    });

    await this.restaurantsRepository.save(restaurant);

    return restaurant;
  }
}

export default UpdateRestaurantService;
