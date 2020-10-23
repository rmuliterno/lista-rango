import { injectable, inject } from 'tsyringe';
import { differenceInMinutes, format, parseISO } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
  sale: boolean;
  saleDescription: string;
  salePrice: number;
  saleDays: string[];
  saleStart?: Date;
  saleEnd?: Date;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id, sale, salePrice, saleDescription, saleDays, saleStart, saleEnd,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    if (!salePrice) {
      throw new AppError('The price for the sale must be provided');
    }

    if (!saleDescription) {
      throw new AppError('The description for the sale must be provided');
    }

    if (!saleDays) {
      throw new AppError('The days of the sale must be specified');
    }

    let saleStartValue = '';
    let saleEndValue = '';

    if (saleStart && saleEnd) {
      const hoursStart = format(saleStart, 'HH:mm:ss');
      const hoursEnd = format(saleEnd, 'HH:mm:ss');

      if (differenceInMinutes(parseISO(hoursStart), parseISO(hoursEnd)) < 0) {
        throw new AppError('Invalid range for the sale period');
      }

      if (differenceInMinutes(parseISO(hoursStart), parseISO(hoursEnd)) <= 14) {
        throw new AppError('You must specify a period grater than 14 minutes for the interval for the sale!');
      }

      saleStartValue = format(saleStart, 'HH:mm');
      saleEndValue = format(saleEnd, 'HH:mm');
    }

    Object.assign(product,
      {
        sale,
        salePrice,
        saleDescription,
        saleDays,
        saleStart: saleStartValue,
        saleEnd: saleEndValue,
      });

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
