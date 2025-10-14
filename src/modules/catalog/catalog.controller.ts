import { Controller, Get, Query, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('search')
  async searchProducts(@Query('q') query: string) {
    return this.catalogService.searchProducts(query);
  }

  @Get('highlights')
  async getHighlights() {
    return this.catalogService.getHighlights();
  }

  @Get('categories')
  async getCategories() {
    return this.catalogService.getProductCategories();
  }

  @Get('recommendations/:userId')
  async getRecommendations(@Param('userId') userId: string) {
    return this.catalogService.recommendProducts(userId);
  }

  @Get('related/:productId')
  async getRelatedProducts(@Param('productId') productId: string) {
    return this.catalogService.getRelatedProducts(productId);
  }

  @Get('new-arrivals')
  async getNewArrivals() {
    return this.catalogService.getNewArrivals();
  }
}
