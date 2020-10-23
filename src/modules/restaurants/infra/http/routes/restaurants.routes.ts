import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import RestaurantsController from '../controllers/RestaurantsController';
import RestaurantsPictureController from '../controllers/RestaurantsPictureController';

const restaurantsRouter = Router();
const upload = multer(uploadConfig);
const restaurantsController = new RestaurantsController();
const restaurantsPictureController = new RestaurantsPictureController();

// restaurantsRouter.get('/', async (request, response) => {
//   const restaurantsRepository = getCustomRepository(RestaurantsRepository);
//   const restaurants = await restaurantsRepository.find();

//   return response.json(restaurants);
// });

restaurantsRouter.post('/', restaurantsController.create);

restaurantsRouter.patch('/:id/picture', upload.single('picture'), restaurantsPictureController.update);

export default restaurantsRouter;
