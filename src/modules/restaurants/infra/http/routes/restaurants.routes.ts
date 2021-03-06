import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import RestaurantsController from '../controllers/RestaurantsController';
import RestaurantsPictureController from '../controllers/RestaurantsPictureController';

const restaurantsRouter = Router();
const upload = multer(uploadConfig);
const restaurantsController = new RestaurantsController();
const restaurantsPictureController = new RestaurantsPictureController();

restaurantsRouter.post('/', restaurantsController.create);
restaurantsRouter.get('/', restaurantsController.list);
restaurantsRouter.get('/:id', restaurantsController.show);
restaurantsRouter.put('/:id', restaurantsController.update);
restaurantsRouter.delete('/:id', restaurantsController.delete);

restaurantsRouter.patch('/:id/picture', upload.single('picture'), restaurantsPictureController.update);

export default restaurantsRouter;
