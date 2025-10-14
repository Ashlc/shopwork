import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId/items')
  async addToCart(@Param('userId') userId: string, @Body() itemData: any) {
    return this.cartService.addItemToCart(userId, itemData);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Delete(':userId/items/:itemId')
  async removeFromCart(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItemFromCart(userId, itemId);
  }

  @Delete(':userId')
  async clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }

  @Put(':userId/items/:itemId')
  async updateItemQuantity(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
    @Body() body: { quantity: number },
  ) {
    return this.cartService.updateItemQuantity(userId, itemId, body.quantity);
  }
}
