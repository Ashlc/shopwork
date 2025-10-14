import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body() productData: any) {
    return this.productService.addProduct(productData);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productData: any) {
    return this.productService.updateProduct(id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
