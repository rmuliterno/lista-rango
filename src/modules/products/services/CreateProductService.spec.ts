import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

describe('CreateProduct', () => {
  it('should be able to create a new product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Coca-cola',
      category: 'Bebida',
      price: 4.99,
      restaurant_id: '123456789',
    });

    expect(product).toHaveProperty('id');
    expect(product.restaurant_id).toBe('123456789');
  });

  it('should not be able to create an already existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);

    const restaurant = '123456789';
    const productName = 'Coca-cola';

    await createProduct.execute({
      name: productName,
      category: 'Bebida',
      price: 4.99,
      restaurant_id: restaurant,
    });

    expect(createProduct.execute({
      name: productName,
      category: 'Bebida',
      price: 4.99,
      restaurant_id: restaurant,
    })).rejects.toBeInstanceOf(AppError);
  });
});
