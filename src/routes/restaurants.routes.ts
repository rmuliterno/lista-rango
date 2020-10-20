import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Restaurant from '../models/Restaurant';
import RestaurantsRepository from '../repositories/RestaurantsRepository';

const restaurantsRouter = Router();
const restaurantsRepository = new RestaurantsRepository();

restaurantsRouter.get('/', (request, response) => {
  const restaurants = restaurantsRepository.all();

  return response.json(restaurants);
});

restaurantsRouter.post('/', (request, response) => {
  const {
    name,
    photo,
    address,
    regularHoursStart,
    regularHoursEnd,
    specialHoursStart,
    specialHoursEnd,
  } = request.body;

  const parsedRegularHoursStartDate = startOfHour(parseISO(regularHoursStart));
  const parsedRegularHoursEndDate = startOfHour(parseISO(regularHoursEnd));
  const parsedSpecialHoursStartDate = startOfHour(parseISO(specialHoursStart));
  const parsedSpecialHoursEndDate = startOfHour(parseISO(specialHoursEnd));

  const isRegularHoursEqual = isEqual(parsedRegularHoursStartDate, parsedRegularHoursEndDate);

  if (isRegularHoursEqual) {
    return response.status(400).json(
      { message: 'You cannot create a restaurant when the opening hour is the same as the closing hour on regular days' },
    );
  }

  const isSpecialHoursEqual = isEqual(parsedSpecialHoursStartDate, parsedSpecialHoursEndDate);

  if (isSpecialHoursEqual) {
    return response.status(400).json(
      { message: 'You cannot create a restaurant when the opening hour is the same as the closing hour on special days' },
    );
  }

  const restaurant = restaurantsRepository.create(
    name,
    photo,
    address,
    parsedRegularHoursStartDate,
    parsedRegularHoursEndDate,
    parsedSpecialHoursStartDate,
    parsedSpecialHoursEndDate,
  );

  return response.json(restaurant);
});

export default restaurantsRouter;
