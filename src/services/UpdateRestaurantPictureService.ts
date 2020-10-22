import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';
import Restaurant from '../models/Restaurant';
import uploadConfig from '../config/upload';

interface Request {
  restaurant_id: string;
  pictureFilename: string;
}

class UpdateRestaurantPictureService {
  public async execute({ restaurant_id, pictureFilename }: Request): Promise<Restaurant> {
    const restaurantsRepository = getRepository(Restaurant);

    const restaurant = await restaurantsRepository.findOne(restaurant_id);

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

    await restaurantsRepository.save(restaurant);

    return restaurant;
  }
}

export default UpdateRestaurantPictureService;
