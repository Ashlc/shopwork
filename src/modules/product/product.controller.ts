import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { IProduct } from 'src/interfaces/models';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(
    @Body() productData: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return this.productService.addProduct(productData);
  }

  @Get(':productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productService.getProduct(productId);
  }

  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() productData: Partial<IProduct>,
  ) {
    return this.productService.updateProduct(productId, productData);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
