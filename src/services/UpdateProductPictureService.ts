import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Product from '../models/Product';
import uploadConfig from '../config/upload';

interface Request {
  product_id: string;
  pictureFilename: string;
}

class UpdateProductPictureService {
  public async execute({ product_id, pictureFilename }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new Error('product not found!');
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
