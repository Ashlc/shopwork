import { Injectable } from '@nestjs/common';
import BaseProductService from 'src/framework/abstract/product.abstract';
import { IProduct } from 'src/interfaces/models';

@Injectable()
export class ProductService extends BaseProductService {
  addProduct(
    productData: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }

  getProduct(productId: string): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }

  updateProduct(
    productId: string,
    productData: Partial<IProduct>,
  ): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }

  deleteProduct(productId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
