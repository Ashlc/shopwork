import { IProduct } from 'src/interfaces/models';

abstract class BaseProductService {
  abstract addProduct(
    productData: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<IProduct>;

  abstract getProduct(productId: string): Promise<IProduct>;

  abstract updateProduct(
    productId: string,
    productData: Partial<IProduct>,
  ): Promise<IProduct>;

  abstract deleteProduct(productId: string): Promise<void>;
}

export default BaseProductService;
