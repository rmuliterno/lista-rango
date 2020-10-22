import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import Product from '../models/Product';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductPictureService';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(Product);
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  const {
    name, price, category, restaurant_id,
  } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    name, price, category, restaurant_id,
  });

  return response.json(product);
});

productsRouter.patch('/:id/picture', upload.single('picture'), async (request, response) => {
  const updateProductPicture = new UpdateProductService();

  const product = await updateProductPicture.execute({
    product_id: request.params.id,
    pictureFilename: request.file.filename,
  });

  return response.json(product);
});

export default productsRouter;
