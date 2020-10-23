import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import CreateRestaurantService from './CreateRestaurantService';
import ListRestaurantsService from './ListRestaurantsService';

describe('ListRestaurants', () => {
  it('should be able to list all restaurants', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const createRestaurant = new CreateRestaurantService(fakeRestaurantsRepository);
    const listRestaurants = new ListRestaurantsService(fakeRestaurantsRepository);

    const regularHourStartDate = new Date(2020, 9, 23, 8);
    const regularHourEndDate = new Date(2020, 9, 23, 20);

    const specialHourStartDate = new Date(2020, 9, 23, 10);
    const specialHourEndDate = new Date(202, 9, 23, 18);

    const restaurant1 = await createRestaurant.execute({
      name: 'Tropical Grill',
      address: 'Rua Affonso Celso Dias, 151',
      regularHoursStart: regularHourStartDate,
      regularHoursEnd: regularHourEndDate,
      specialHoursStart: specialHourStartDate,
      specialHoursEnd: specialHourEndDate,
    });

    const restaurant2 = await createRestaurant.execute({
      name: 'China in Box',
      address: 'Rua Lúcia de Almeida, 376',
      regularHoursStart: regularHourStartDate,
      regularHoursEnd: regularHourEndDate,
      specialHoursStart: specialHourStartDate,
      specialHoursEnd: specialHourEndDate,
    });

    const list = await listRestaurants.execute();

    expect(list[0].name).toBe(restaurant1.name);
    expect(list[1].name).toBe(restaurant2.name);
  });
});
