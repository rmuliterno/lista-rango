import { Router } from 'express';
import { parseISO } from 'date-fns';

import RestaurantsRepository from '../repositories/RestaurantsRepository';
import CreateRestaurantService from '../services/CreateRestaurantService';

const restaurantsRouter = Router();
const restaurantsRepository = new RestaurantsRepository();

restaurantsRouter.get('/', (request, response) => {
  const restaurants = restaurantsRepository.all();

  return response.json(restaurants);
});

restaurantsRouter.post('/', (request, response) => {
  try {
    const {
      name,
      photo,
      address,
      regularHoursStart,
      regularHoursEnd,
      specialHoursStart,
      specialHoursEnd,
    } = request.body;

    const createRestaurant = new CreateRestaurantService(restaurantsRepository);

    const restaurant = createRestaurant.execute({
      name,
      photo,
      address,
      regularHoursStart: parseISO(regularHoursStart),
      regularHoursEnd: parseISO(regularHoursEnd),
      specialHoursStart: parseISO(specialHoursStart),
      specialHoursEnd: parseISO(specialHoursEnd),
    });

    return response.json(restaurant);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default restaurantsRouter;
