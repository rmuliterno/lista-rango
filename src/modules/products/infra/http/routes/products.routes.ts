import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import CreateProductService from '@modules/products/services/CreateProductService';
import UpdateProductService from '@modules/products/services/UpdateProductPictureService';

const productsRouter = Router();
const upload = multer(uploadConfig);

// productsRouter.get('/', async (request, response) => {
//   const productsRepository = getRepository(Product);
//   const products = await productsRepository.find();

//   return response.json(products);
// });

productsRouter.post('/', async (request, response) => {
  const {
    name, price, category, restaurant_id,
  } = request.body;

  const createProduct = container.resolve(CreateProductService);

  const product = await createProduct.execute({
    name, price, category, restaurant_id,
  });

  return response.json(product);
});

productsRouter.patch('/:id/picture', upload.single('picture'), async (request, response) => {
  const updateProductPicture = container.resolve(UpdateProductService);

  const product = await updateProductPicture.execute({
    product_id: request.params.id,
    pictureFilename: request.file.filename,
  });

  return response.json(product);
});

export default productsRouter;
