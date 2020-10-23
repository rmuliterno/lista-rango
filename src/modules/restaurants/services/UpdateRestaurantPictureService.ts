import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

interface Request {
  restaurant_id: string;
  pictureFilename: string;
}

@injectable()
class UpdateRestaurantPictureService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ restaurant_id, pictureFilename }: Request): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant not found!', 404);
    }

    // Deleting old file if it exists
    if (restaurant.picture) {
      await this.storageProvider.deleteFile(restaurant.picture);
    }

    const filename = await this.storageProvider.saveFile(pictureFilename);

    restaurant.picture = filename;

    await this.restaurantsRepository.save(restaurant);

    return restaurant;
  }
}

export default UpdateRestaurantPictureService;
