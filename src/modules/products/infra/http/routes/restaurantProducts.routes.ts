import { Router } from 'express';

import RestaurantProductsController from '../controllers/RestaurantProductsController';

const restaurantProductsRouter = Router();
const restaurantProductsController = new RestaurantProductsController();

restaurantProductsRouter.get('/:id', restaurantProductsController.read);

export default restaurantProductsRouter;
