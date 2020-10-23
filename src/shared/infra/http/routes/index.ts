import { Router } from 'express';
import restaurantsRouter from '@modules/restaurants/infra/http/routes/restaurants.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import restaurantProductsRouter from '@modules/products/infra/http/routes/restaurantProducts.routes';

const routes = Router();

routes.use('/restaurants', restaurantsRouter);
routes.use('/restaurants/products', restaurantProductsRouter);
routes.use('/products', productsRouter);

export default routes;
