import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface Request {
  product_id: string;
  pictureFilename: string;
}

@injectable()
class UpdateProductPictureService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ product_id, pictureFilename }: Request): Promise<Product> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('product not found!', 404);
    }

    // Deleting old file if it exists
    if (product.picture) {
      await this.storageProvider.deleteFile(product.picture);
    }

    const filename = await this.storageProvider.saveFile(pictureFilename);

    product.picture = filename;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductPictureService;
