import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { ICart } from 'src/interfaces/models';
import { CartService } from './cart.service';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async getCart(@Param('userId') userId: string): Promise<ICart> {
    return this.cartService.getCart(userId);
  }

  @Post(':userId/cart')
  async addToCart(
    @Param('userId') userId: string,
    @Body() itemData: { productId: string; quantity: number }[],
  ): Promise<ICart> {
    return this.cartService.addToCart(userId, itemData);
  }

  @Put(':userId/cart/:itemId')
  async updateItemQuantity(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
    @Body() data: { quantity: number },
  ): Promise<ICart> {
    return this.cartService.updateItemQuantity(userId, itemId, data.quantity);
  }

  @Delete(':userId/items/:itemId')
  async removeItemFromCart(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
  ): Promise<ICart> {
    return this.cartService.removeItemFromCart(userId, itemId);
  }

  @Delete(':userId')
  async clearCart(@Param('userId') userId: string): Promise<void> {
    return this.cartService.clearCart(userId);
  }
}
