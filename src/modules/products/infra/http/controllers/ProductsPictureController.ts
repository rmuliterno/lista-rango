import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProductService from '@modules/products/services/UpdateProductPictureService';

export default class ProductsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProductPicture = container.resolve(UpdateProductService);

    const product = await updateProductPicture.execute({
      product_id: request.params.id,
      pictureFilename: request.file.filename,
    });

    return response.json(product);
  }
}
