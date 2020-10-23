import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    await this.ormRepository.save(product);

    return product;
  }

  public async findOne({
    name, restaurant_id,
  }: ICreateProductDTO): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name, restaurant_id },
    });

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return 'Success!';
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findByRestaurant(id: string): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find({
      where: {
        restaurant_id: id,
      },
      order: {
        name: 'ASC',
      },
    });

    return products;
  }
}

export default ProductsRepository;
