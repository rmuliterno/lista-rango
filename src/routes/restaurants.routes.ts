import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import RestaurantsRepository from '../repositories/RestaurantsRepository';
import CreateRestaurantService from '../services/CreateRestaurantService';

const restaurantsRouter = Router();

restaurantsRouter.get('/', async (request, response) => {
  const restaurantsRepository = getCustomRepository(RestaurantsRepository);
  const restaurants = await restaurantsRepository.find();

  return response.json(restaurants);
});

restaurantsRouter.post('/', async (request, response) => {
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

    const createRestaurant = new CreateRestaurantService();

    const restaurant = await createRestaurant.execute({
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
