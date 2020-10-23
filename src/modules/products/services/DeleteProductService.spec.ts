import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';

describe('DeleteProduct', () => {
  it('should be able to delete a product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);
    const deleteProduct = new DeleteProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Coca-cola',
      category: 'Bebida',
      price: 4.99,
      restaurant_id: '123456789',
    });

    const response = await deleteProduct.execute(product.id);

    expect(response).toBe('Success!');
  });

  it('should not be able to delete a non-existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const deleteProduct = new DeleteProductService(fakeProductsRepository);

    expect(deleteProduct.execute('123456789')).rejects.toBeInstanceOf(AppError);
  });
});
