import { uuid } from 'uuidv4';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    product.id = uuid();
    product.name = productData.name;
    product.price = productData.price;
    product.category = productData.category;
    product.restaurant_id = productData.restaurant_id;

    this.products.push(product);

    return product;
  }

  public async findOne({
    name, restaurant_id,
  }: {name: string, restaurant_id: string}): Promise<Product | undefined> {
    const findProduct = this.products.find(
      (product) => product.name === name && product.restaurant_id === restaurant_id,
    );

    return findProduct;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      (findProduct) => findProduct.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find((product) => product.id === id);

    return findProduct;
  }
}

export default ProductsRepository;
