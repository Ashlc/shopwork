import { IProduct } from 'src/interfaces/models';
import { IProductService } from 'src/interfaces/services';

abstract class ProductService implements IProductService {
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

export default ProductService;
