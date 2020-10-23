import AppError from '@shared/errors/AppError';

import FakeRestaurantsRepository from '@modules/restaurants/repositories/fakes/FakeRestaurantsRepository';
import CreateRestaurantService from '@modules/restaurants/services/CreateRestaurantService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

import CreateProductService from './CreateProductService';
import ListRestaurantProductsService from './ListRestaurantProductsService';

describe('ListProduct', () => {
  it('should be able to list all product of a Restaurant', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();

    const createProduct = new CreateProductService(fakeProductsRepository);
    const createRestaurant = new CreateRestaurantService(fakeRestaurantsRepository);
    const listRestaurantProducts = new ListRestaurantProductsService(
      fakeProductsRepository, fakeRestaurantsRepository,
    );

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

    const product1 = await createProduct.execute({
      name: 'Coca-cola',
      category: 'Bebida',
      price: 4.99,
      restaurant_id: restaurant.id,
    });

    const product2 = await createProduct.execute({
      name: 'Pepsi',
      category: 'Bebida melhor',
      price: 4.59,
      restaurant_id: restaurant.id,
    });

    const listed = await listRestaurantProducts.execute(restaurant.id);

    expect(listed[0].name).toBe(product1.name);
    expect(listed[1]?.name).toBe(product2.name);
  });

  it('should not be able to list products from a non-existing restaurant', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();

    const listRestaurantProducts = new ListRestaurantProductsService(
      fakeProductsRepository, fakeRestaurantsRepository,
    );

    expect(listRestaurantProducts.execute('123456789')).rejects.toBeInstanceOf(AppError);
  });
});
