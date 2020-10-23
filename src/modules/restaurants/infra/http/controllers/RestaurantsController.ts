import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateRestaurantService from '@modules/restaurants/services/CreateRestaurantService';

export default class RestaurantsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      address,
      regularHoursStart,
      regularHoursEnd,
      specialHoursStart,
      specialHoursEnd,
    } = request.body;

    const createRestaurant = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurant.execute({
      name,
      address,
      regularHoursStart: parseISO(regularHoursStart),
      regularHoursEnd: parseISO(regularHoursEnd),
      specialHoursStart: parseISO(specialHoursStart),
      specialHoursEnd: parseISO(specialHoursEnd),
    });

    return response.json(restaurant);
  }
}
