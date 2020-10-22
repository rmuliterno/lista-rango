import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';
import uploadConfig from '@config/upload';
import IUsersRepository from '../repositories/IRestaurantsRepository';

interface Request {
  restaurant_id: string;
  pictureFilename: string;
}

class UpdateRestaurantPictureService {
  constructor(private restaurantsRepository: IUsersRepository) {}

  public async execute({ restaurant_id, pictureFilename }: Request): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findById(restaurant_id);

    if (!restaurant) {
      throw new AppError('Restaurant not found!', 404);
    }

    // Deleting old file if it exists
    if (restaurant.picture) {
      const restaurantPictureFilePath = path.join(uploadConfig.directory, restaurant.picture);
      const restaurantPictureExists = await fs.promises.stat(restaurantPictureFilePath);

      if (restaurantPictureExists) {
        await fs.promises.unlink(restaurantPictureFilePath);
      }
    }

    restaurant.picture = pictureFilename;

    await this.restaurantsRepository.save(restaurant);

    return restaurant;
  }
}

export default UpdateRestaurantPictureService;
