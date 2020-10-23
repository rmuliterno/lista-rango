import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProductsController from '../controllers/ProductsController';
import ProductsPictureController from '../controllers/ProductsPictureController';
import ProductsSaleController from '../controllers/ProductsSaleController';

const productsRouter = Router();
const upload = multer(uploadConfig);
const productsController = new ProductsController();
const productsPictureController = new ProductsPictureController();
const productsSaleController = new ProductsSaleController();

productsRouter.get('/:id', productsController.read);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);
productsRouter.post('/', productsController.create);

productsRouter.put('/:id/sale', productsSaleController.update);
productsRouter.patch('/:id/picture', upload.single('picture'), productsPictureController.update);

export default productsRouter;
