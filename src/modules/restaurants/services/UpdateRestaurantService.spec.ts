import AppError from '@shared/errors/AppError';

import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import CreateRestaurantService from './CreateRestaurantService';
import UpdateRestaurantService from './UpdateRestaurantService';

describe('UpdateRestaurant', () => {
  it('should be able to update a restaurant', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const createRestaurant = new CreateRestaurantService(fakeRestaurantsRepository);
    const updateRestaurant = new UpdateRestaurantService(fakeRestaurantsRepository);

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

    const updated = await updateRestaurant.execute({
      id: restaurant.id,
      name: 'China in box',
      address: 'Rua Lúcia de Almeida, 376',
      regularHoursStart: regularHourStartDate,
      regularHoursEnd: regularHourEndDate,
      specialHoursStart: specialHourStartDate,
      specialHoursEnd: specialHourEndDate,
    });

    expect(restaurant.name).toBe(updated.name);
    expect(restaurant.address).toBe(updated.address);
  });

  it('should not be able to update a non-existing restaurant', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const updateRestaurant = new UpdateRestaurantService(fakeRestaurantsRepository);

    const regularHourStartDate = new Date(2020, 9, 23, 8);
    const regularHourEndDate = new Date(2020, 9, 23, 20);

    const specialHourStartDate = new Date(2020, 9, 23, 10);
    const specialHourEndDate = new Date(202, 9, 23, 18);

    expect(updateRestaurant.execute({
      id: '123456789',
      name: 'China in box',
      address: 'Rua Lúcia de Almeida, 376',
      regularHoursStart: regularHourStartDate,
      regularHoursEnd: regularHourEndDate,
      specialHoursStart: specialHourStartDate,
      specialHoursEnd: specialHourEndDate,
    })).rejects.toBeInstanceOf(AppError);
  });
});
