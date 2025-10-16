import { Injectable } from '@nestjs/common';
import BaseCatalogService from 'src/framework/abstract/catalog.abstract';
import { ICategory, IProduct } from 'src/interfaces/models';

@Injectable()
export class CatalogService extends BaseCatalogService {
  searchProducts(query: string): Promise<IProduct[]> {
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
