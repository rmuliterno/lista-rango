import AppError from '@shared/errors/AppError';

import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import CreateRestaurantService from './CreateRestaurantService';
import ListSingleRestaurantService from './ListSingleRestaurantService';

describe('ListSingleRestaurant', () => {
  it('should be able to list a single restaurant', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const createRestaurant = new CreateRestaurantService(fakeRestaurantsRepository);
    const listRestaurants = new ListSingleRestaurantService(fakeRestaurantsRepository);

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

    const searched = await listRestaurants.execute(restaurant.id);

    expect(searched?.name).toBe(restaurant.name);
  });

  it('should not be able to list a non-existing restaurant', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const listRestaurant = new ListSingleRestaurantService(fakeRestaurantsRepository);

    expect(listRestaurant.execute('123456789')).rejects.toBeInstanceOf(AppError);
  });
});
