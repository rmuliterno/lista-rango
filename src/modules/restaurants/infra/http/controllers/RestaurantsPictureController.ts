import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateRestaurantService from '@modules/restaurants/services/UpdateRestaurantPictureService';

export default class RestaurantsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateRestaurantPicture = container.resolve(UpdateRestaurantService);

    const restaurant = await updateRestaurantPicture.execute({
      restaurant_id: request.params.id,
      pictureFilename: request.file.filename,
    });

    return response.json(restaurant);
  }
}
