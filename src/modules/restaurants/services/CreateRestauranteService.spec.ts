import AppError from '@shared/errors/AppError';

import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import CreateRestaurantService from './CreateRestaurantService';

describe('CreateRestaurant', () => {
  it('should be able to create a new restaurant', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const createRestaurant = new CreateRestaurantService(fakeRestaurantsRepository);

    const regularHourStartDate = new Date(2020, 9, 23, 8);
    const regularHourEndDate = new Date(2020, 9, 23, 20);

    const specialHourStartDate = new Date(2020, 9, 23, 10);
    const specialHourEndDate = new Date(202, 9, 23, 18);

    const restaurant = await createRestaurant.execute({
      name: 'Tropical Grill',
      address: 'Rua Affonso Celso Dias, 151',
      regularHoursStart: regularHourStartDate,
      regularHoursEnd: regularHourEndDate,
      specialHoursStart: specialHourStartDate,
      specialHoursEnd: specialHourEndDate,
    });

    expect(restaurant).toHaveProperty('id');
  });

  it('should not be able to create a new restaurant with equal opening and closing hours on regular days', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const createRestaurant = new CreateRestaurantService(fakeRestaurantsRepository);

    const regularHour = new Date(2020, 9, 23, 8);

    const specialHourStartDate = new Date(2020, 9, 23, 10);
    const specialHourEndDate = new Date(202, 9, 23, 18);

    expect(createRestaurant.execute({
      name: 'Tropical Grill',
      address: 'Rua Affonso Celso Dias, 151',
      regularHoursStart: regularHour,
      regularHoursEnd: regularHour,
      specialHoursStart: specialHourStartDate,
      specialHoursEnd: specialHourEndDate,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new restaurant with equal opening and closing hours on special days', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const createRestaurant = new CreateRestaurantService(fakeRestaurantsRepository);

    const regularHourStartDate = new Date(2020, 9, 23, 8);
    const regularHourEndDate = new Date(2020, 9, 23, 20);

    const specialHour = new Date(2020, 9, 23, 10);

    expect(createRestaurant.execute({
      name: 'Tropical Grill',
      address: 'Rua Affonso Celso Dias, 151',
      regularHoursStart: regularHourStartDate,
      regularHoursEnd: regularHourEndDate,
      specialHoursStart: specialHour,
      specialHoursEnd: specialHour,
    })).rejects.toBeInstanceOf(AppError);
  });
});
