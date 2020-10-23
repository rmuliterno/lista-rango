import AppError from '@shared/errors/AppError';

import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import CreateRestaurantService from './CreateRestaurantService';
import DeleteRestaurantService from './DeleteRestaurantService';

describe('DeleteRestaurant', () => {
  it('should be able to delete a restaurant', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const createRestaurant = new CreateRestaurantService(fakeRestaurantsRepository);
    const deleteRestaurant = new DeleteRestaurantService(fakeRestaurantsRepository);

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

    const response = await deleteRestaurant.execute(restaurant.id);

    expect(response).toBe('Success!');
  });

  it('should not be able to delete a non-existing restaurant', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const deleteRestaurant = new DeleteRestaurantService(fakeRestaurantsRepository);

    expect(deleteRestaurant.execute('123456789')).rejects.toBeInstanceOf(AppError);
  });
});
