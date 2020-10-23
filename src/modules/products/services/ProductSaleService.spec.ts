import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import ProductSaleService from './ProductSaleService';

describe('ProductSale', () => {
  it('should be able to create a sale on a product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);
    const productSale = new ProductSaleService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Strogonoff',
      category: 'Comida',
      price: 19.99,
      restaurant_id: '123456789',
    });

    const updated = await productSale.execute({
      id: product.id,
      sale: true,
      saleDescription: 'A melhor promoção de strogonoff da região',
      salePrice: 9.99,
      saleDays: ['Segunda', 'Terça', 'Quarta'],
      saleStart: '2020-10-23T19:04:51.250Z',
      saleEnd: '2020-10-23T19:23:51.250Z',
    });

    expect(product.sale).toBe(true);
    expect(product.saleDescription).toBe(updated.saleDescription);
  });

  it('should not be able to create a sale on a non-existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productSale = new ProductSaleService(fakeProductsRepository);

    expect(productSale.execute({
      id: '1234564987',
      sale: true,
      saleDescription: 'A melhor promoção de strogonoff da região',
      salePrice: 9.99,
      saleDays: ['Segunda', 'Terça', 'Quarta'],
      saleStart: '2020-10-23T19:04:51.250Z',
      saleEnd: '2020-10-23T19:23:51.250Z',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a sale with an invalid time range', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productSale = new ProductSaleService(fakeProductsRepository);
    const createProduct = new CreateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Strogonoff',
      category: 'Comida',
      price: 19.99,
      restaurant_id: '123456789',
    });

    expect(productSale.execute({
      id: product.id,
      sale: true,
      saleDescription: 'A melhor promoção de strogonoff da região',
      salePrice: 9.99,
      saleDays: ['Segunda', 'Terça', 'Quarta'],
      saleStart: '2020-10-23T19:23:51.250Z',
      saleEnd: '2020-10-23T19:04:51.250Z',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a sale with a time interval of 14 minutes or less', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productSale = new ProductSaleService(fakeProductsRepository);
    const createProduct = new CreateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      name: 'Strogonoff',
      category: 'Comida',
      price: 19.99,
      restaurant_id: '123456789',
    });

    expect(productSale.execute({
      id: product.id,
      sale: true,
      saleDescription: 'A melhor promoção de strogonoff da região',
      salePrice: 9.99,
      saleDays: ['Segunda', 'Terça', 'Quarta'],
      saleStart: '2020-10-23T19:20:51.250Z',
      saleEnd: '2020-10-23T19:23:51.250Z',
    })).rejects.toBeInstanceOf(AppError);
  });
});
