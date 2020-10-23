import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import UpdateProductPictureService from './UpdateProductPictureService';

describe('UpdateProductPicture', () => {
  it('should be able to update a product picture', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateProductPicture = new UpdateProductPictureService(
      fakeProductsRepository, fakeStorageProvider,
    );

    const product = await fakeProductsRepository.create({
      name: 'Coca-cola',
      category: 'Bebidas',
      price: 4.99,
      restaurant_id: '123456789',
    });

    await updateProductPicture.execute({
      product_id: product.id,
      pictureFilename: 'picture.jpg',
    });

    expect(product.picture).toBe('picture.jpg');
  });

  it('should not be able to update a product picture for a non-existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateProductPicture = new UpdateProductPictureService(
      fakeProductsRepository, fakeStorageProvider,
    );

    expect(updateProductPicture.execute({
      product_id: '123456789',
      pictureFilename: 'picture.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to overwrite old picture', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateProductPicture = new UpdateProductPictureService(
      fakeProductsRepository, fakeStorageProvider,
    );

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const product = await fakeProductsRepository.create({
      name: 'Coca-cola',
      category: 'Bebidas',
      price: 4.99,
      restaurant_id: '123456789',
    });

    await updateProductPicture.execute({
      product_id: product.id,
      pictureFilename: 'picture.jpg',
    });

    await updateProductPicture.execute({
      product_id: product.id,
      pictureFilename: 'picture2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('picture.jpg');

    expect(product.picture).toBe('picture2.jpg');
  });
});
