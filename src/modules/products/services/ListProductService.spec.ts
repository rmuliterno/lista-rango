import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ListProductService from './ListProductService';

describe('ListProduct', () => {
  it('should be able to list a product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);
    const listProduct = new ListProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Coca-cola',
      category: 'Bebida',
      price: 4.99,
      restaurant_id: '123456789',
    });

    const listed = await listProduct.execute(product.id);

    expect(listed.id).toBe(product.id);
    expect(listed.name).toBe(product.name);
  });

  it('should not be able to list a non-existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const listProduct = new ListProductService(fakeProductsRepository);

    expect(listProduct.execute('123456789')).rejects.toBeInstanceOf(AppError);
  });
});
