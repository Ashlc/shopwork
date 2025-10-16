import { Controller, Get, Param, Query } from '@nestjs/common';
import type { IProduct } from 'src/interfaces/models';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('')
  async searchProducts(@Query('q') query: string): Promise<IProduct[]> {
    return this.catalogService.searchProducts(query);
  }

  @Get('highlights')
  async getHighlights(): Promise<IProduct[]> {
    return this.catalogService.getHighlights();
  }

  @Get('categories')
  async getProductCategories() {
    return this.catalogService.getProductCategories();
  }

  @Get('recommendations/user/:userId')
  async recommendProducts(
    @Param('userId') userId: string,
  ): Promise<IProduct[]> {
    return this.catalogService.recommendProducts(userId);
  }

  @Get('recommendations/product/:productId')
  async getRelatedProducts(
    @Param('productId') productId: string,
  ): Promise<IProduct[]> {
    return this.catalogService.getRelatedProducts(productId);
  }

  @Get('new-arrivals')
  async getNewArrivals(): Promise<IProduct[]> {
    return this.catalogService.getNewArrivals();
  }
}
