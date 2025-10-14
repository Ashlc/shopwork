import { Injectable } from '@nestjs/common';
import { ICategory, IProduct } from 'src/interfaces/models';
import { ICatalogService } from 'src/interfaces/services';

@Injectable()
export class CatalogService implements ICatalogService {
  searchProducts(query: string): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }

  filterProducts(filters: any): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }

  getHighlights(): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }

  getProductCategories(): Promise<ICategory[]> {
    throw new Error('Method not implemented.');
  }

  recommendProducts(userId: string): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }

  getRelatedProducts(productId: string): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }

  getNewArrivals(): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
}
