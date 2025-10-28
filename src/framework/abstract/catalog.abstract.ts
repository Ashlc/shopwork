import { ICategory, IProduct } from 'src/interfaces/models';

abstract class BaseCatalogService {
  abstract searchProducts(query: string): Promise<IProduct[]>;

  abstract getHighlights(): Promise<IProduct[]>;

  abstract getProductCategories(): Promise<ICategory[]>;

  abstract recommendProducts(userId: string): Promise<IProduct[]>;

  abstract getRelatedProducts(productId: string): Promise<IProduct[]>;

  abstract getNewArrivals(): Promise<IProduct[]>;
}

export default BaseCatalogService;
