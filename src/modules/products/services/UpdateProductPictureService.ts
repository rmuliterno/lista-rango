import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface Request {
  product_id: string;
  pictureFilename: string;
}

class UpdateProductPictureService {
  constructor(private productsRepository: IProductsRepository) {}

  public async execute({ product_id, pictureFilename }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('product not found!', 404);
    }

    // Deleting old file if it exists
    if (product.picture) {
      const productPictureFilePath = path.join(uploadConfig.directory, product.picture);
      const productPictureExists = await fs.promises.stat(productPictureFilePath);

      if (productPictureExists) {
        await fs.promises.unlink(productPictureFilePath);
      }
    }

    product.picture = pictureFilename;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductPictureService;
