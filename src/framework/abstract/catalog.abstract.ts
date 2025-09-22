import { ICategory, IProduct } from 'src/interfaces/models';
import { ICatalogService } from 'src/interfaces/services';

abstract class CatalogService implements ICatalogService {
  abstract searchProducts(query: string): Promise<IProduct[]>;

  abstract filterProducts(filters: any): Promise<IProduct[]>;

  abstract getHighlights(): Promise<IProduct[]>;

  abstract getProductCategories(): Promise<ICategory[]>;

  abstract recommendProducts(userId: string): Promise<IProduct[]>;

  abstract getRelatedProducts(productId: string): Promise<IProduct[]>;

  abstract getNewArrivals(): Promise<IProduct[]>;
}

export default CatalogService;
