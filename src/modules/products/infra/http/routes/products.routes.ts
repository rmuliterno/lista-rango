import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProductsController from '../controllers/ProductsController';
import ProductsPictureController from '../controllers/ProductsPictureController';

const productsRouter = Router();
const upload = multer(uploadConfig);
const productsController = new ProductsController();
const productsPictureController = new ProductsPictureController();

productsRouter.get('/:id', productsController.read);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

productsRouter.post('/', productsController.create);

productsRouter.patch('/:id/picture', upload.single('picture'), productsPictureController.update);

export default productsRouter;
