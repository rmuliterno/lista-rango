import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateRestaurantService from '@modules/restaurants/services/CreateRestaurantService';
import UpdateRestaurantService from '@modules/restaurants/services/UpdateRestaurantService';
import ListRestaurantsService from '@modules/restaurants/services/ListRestaurantsService';
import ListSingleRestaurantService from '@modules/restaurants/services/ListSingleRestaurantService';
import DeleteRestaurantService from '@modules/restaurants/services/DeleteRestaurantService';

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

  public async list(request: Request, response: Response): Promise<Response> {
    const listRestaurants = container.resolve(ListRestaurantsService);

    const restaurants = await listRestaurants.execute();

    return response.json(restaurants);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const listRestaurant = container.resolve(ListSingleRestaurantService);

    const restaurant = await listRestaurant.execute(id);

    return response.json(restaurant);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      address,
      regularHoursStart,
      regularHoursEnd,
      specialHoursStart,
      specialHoursEnd,
    } = request.body;

    const updateRestaurant = container.resolve(UpdateRestaurantService);

    const restaurant = await updateRestaurant.execute({
      id,
      name,
      address,
      regularHoursStart: parseISO(regularHoursStart),
      regularHoursEnd: parseISO(regularHoursEnd),
      specialHoursStart: parseISO(specialHoursStart),
      specialHoursEnd: parseISO(specialHoursEnd),
    });

    return response.json(restaurant);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRestaurant = container.resolve(DeleteRestaurantService);

    await deleteRestaurant.execute(id);

    return response.json({ message: 'Restaurant deleted successfully!' });
  }
}
