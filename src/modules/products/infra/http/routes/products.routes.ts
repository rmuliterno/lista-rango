import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductPictureService';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

const productsRouter = Router();
const upload = multer(uploadConfig);
const productsRepository = new ProductsRepository();

// productsRouter.get('/', async (request, response) => {
//   const productsRepository = getRepository(Product);
//   const products = await productsRepository.find();

//   return response.json(products);
// });

productsRouter.post('/', async (request, response) => {
  const {
    name, price, category, restaurant_id,
  } = request.body;

  const createProduct = new CreateProductService(productsRepository);

  const product = await createProduct.execute({
    name, price, category, restaurant_id,
  });

  return response.json(product);
});

productsRouter.patch('/:id/picture', upload.single('picture'), async (request, response) => {
  const updateProductPicture = new UpdateProductService(productsRepository);

  const product = await updateProductPicture.execute({
    product_id: request.params.id,
    pictureFilename: request.file.filename,
  });

  return response.json(product);
});

export default productsRouter;
