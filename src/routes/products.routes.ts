import { Router } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(Product);
  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', async (request, response) => {
  try {
    const {
      name, price, category, restaurant_id,
    } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name, price, category, restaurant_id,
    });

    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRouter;