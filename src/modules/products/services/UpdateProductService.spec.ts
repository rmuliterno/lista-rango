import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductService';

describe('CreateProduct', () => {
  it('should be able to update a product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);
    const updateProduct = new UpdateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Coca-cola',
      category: 'Bebida',
      price: 4.99,
      restaurant_id: '123456789',
    });

    const updated = await updateProduct.execute({
      name: 'Pepsi',
      category: 'Bebida melhor',
      price: 4.49,
      id: product.id,
    });

    expect(updated.id).toBe(product.id);
    expect(product.name).toBe('Pepsi');
  });

  it('should not be able to update a non-existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const updateProduct = new UpdateProductService(fakeProductsRepository);

    expect(updateProduct.execute({
      name: 'Pepsi',
      category: 'Bebida melhor',
      price: 4.59,
      id: '123456789',
    })).rejects.toBeInstanceOf(AppError);
  });
});
