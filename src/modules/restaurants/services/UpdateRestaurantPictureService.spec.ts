import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeRestaurantsRepository from '../repositories/fakes/FakeRestaurantsRepository';
import UpdateRestaurantPictureService from './UpdateRestaurantPictureService';

describe('UpdateRestaurantPicture', () => {
  it('should be able to update a restaurant picture', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateRestaurantPicture = new UpdateRestaurantPictureService(
      fakeRestaurantsRepository, fakeStorageProvider,
    );

    const regularHourStartDate = new Date(2020, 9, 23, 8);
    const regularHourEndDate = new Date(2020, 9, 23, 20);

    const specialHourStartDate = new Date(2020, 9, 23, 10);
    const specialHourEndDate = new Date(202, 9, 23, 18);

    const restaurant = await fakeRestaurantsRepository.create({
      name: 'Tropical Grill',
      address: 'Rua Affonso Celso Dias, 151',
      regularHoursStart: regularHourStartDate,
      regularHoursEnd: regularHourEndDate,
      specialHoursStart: specialHourStartDate,
      specialHoursEnd: specialHourEndDate,
    });

    await updateRestaurantPicture.execute({
      restaurant_id: restaurant.id,
      pictureFilename: 'picture.jpg',
    });

    expect(restaurant.picture).toBe('picture.jpg');
  });

  it('should not be able to update a restaurant picture for a non-existing restaurant', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateRestaurantPicture = new UpdateRestaurantPictureService(
      fakeRestaurantsRepository, fakeStorageProvider,
    );

    expect(updateRestaurantPicture.execute({
      restaurant_id: '123456789',
      pictureFilename: 'picture.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to overwrite old picture', async () => {
    const fakeRestaurantsRepository = new FakeRestaurantsRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateRestaurantPicture = new UpdateRestaurantPictureService(
      fakeRestaurantsRepository, fakeStorageProvider,
    );

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const regularHourStartDate = new Date(2020, 9, 23, 8);
    const regularHourEndDate = new Date(2020, 9, 23, 20);

    const specialHourStartDate = new Date(2020, 9, 23, 10);
    const specialHourEndDate = new Date(202, 9, 23, 18);

    const restaurant = await fakeRestaurantsRepository.create({
      name: 'Tropical Grill',
      address: 'Rua Affonso Celso Dias, 151',
      regularHoursStart: regularHourStartDate,
      regularHoursEnd: regularHourEndDate,
      specialHoursStart: specialHourStartDate,
      specialHoursEnd: specialHourEndDate,
    });

    await updateRestaurantPicture.execute({
      restaurant_id: restaurant.id,
      pictureFilename: 'picture.jpg',
    });

    await updateRestaurantPicture.execute({
      restaurant_id: restaurant.id,
      pictureFilename: 'picture2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('picture.jpg');

    expect(restaurant.picture).toBe('picture2.jpg');
  });
});
