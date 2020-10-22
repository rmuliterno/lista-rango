import Product from '../infra/typeorm/entities/Product';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  findOne(
    { name, restaurant_id }: {name: string, restaurant_id: string}
  ): Promise<Product | undefined>;
// eslint-disable-next-line semi
};
