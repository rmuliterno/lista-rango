import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import RestaurantsRepository from '../repositories/RestaurantsRepository';
import CreateRestaurantService from '../services/CreateRestaurantService';
import UpdateRestaurantPictureService from '../services/UpdateRestaurantPictureService';

const restaurantsRouter = Router();
const upload = multer(uploadConfig);

restaurantsRouter.get('/', async (request, response) => {
  const restaurantsRepository = getCustomRepository(RestaurantsRepository);
  const restaurants = await restaurantsRepository.find();

  return response.json(restaurants);
});

restaurantsRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      address,
      regularHoursStart,
      regularHoursEnd,
      specialHoursStart,
      specialHoursEnd,
    } = request.body;

    const createRestaurant = new CreateRestaurantService();

    const restaurant = await createRestaurant.execute({
      name,
      address,
      regularHoursStart: parseISO(regularHoursStart),
      regularHoursEnd: parseISO(regularHoursEnd),
      specialHoursStart: parseISO(specialHoursStart),
      specialHoursEnd: parseISO(specialHoursEnd),
    });

    return response.json(restaurant);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

restaurantsRouter.patch('/:id/picture', upload.single('picture'), async (request, response) => {
  try {
    const updateRestaurantPicture = new UpdateRestaurantPictureService();

    const restaurant = await updateRestaurantPicture.execute({
      restaurant_id: request.params.id,
      pictureFilename: request.file.filename,
    });

    return response.json(restaurant);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default restaurantsRouter;
