import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Restaurant from '../models/Restaurant';

const restaurantsRouter = Router();

const restaurants: Restaurant[] = [];

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

  const restaurant = new Restaurant(
    name,
    photo,
    address,
    parsedRegularHoursStartDate,
    parsedRegularHoursEndDate,
    parsedSpecialHoursStartDate,
    parsedSpecialHoursEndDate,
  );

  restaurants.push(restaurant);

  return response.json(restaurant);
});

export default restaurantsRouter;
