import { Router } from 'express';
import restaurantsRouter from './restaurants.routes';

const routes = Router();

routes.use('/restaurants', restaurantsRouter);

export default routes;
