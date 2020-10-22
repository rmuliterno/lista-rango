import { Router } from 'express';
import restaurantsRouter from './restaurants.routes';
import productsRouter from './products.routes';

const routes = Router();

routes.use('/restaurants', restaurantsRouter);
routes.use('/products', productsRouter);

export default routes;
