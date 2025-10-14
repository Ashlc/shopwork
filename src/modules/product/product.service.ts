import { Injectable } from '@nestjs/common';
import { IProduct } from 'src/interfaces/models';
import { IProductService } from 'src/interfaces/services';

@Injectable()
export class ProductService implements IProductService {
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
