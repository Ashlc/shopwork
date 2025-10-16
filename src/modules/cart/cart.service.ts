import { Injectable } from '@nestjs/common';
import BaseCartService from 'src/framework/abstract/cart.abstract';
import { ICart } from 'src/interfaces/models';

@Injectable()
export class CartService extends BaseCartService {
  addToCart(
    userId: string,
    items: {
      productId: string;
      quantity: number;
    }[],
  ): Promise<ICart> {
    throw new Error('Method not implemented.');
  }

  removeItemFromCart(userId: string, itemId: string): Promise<ICart> {
    throw new Error('Method not implemented.');
  }

  getCart(userId: string): Promise<ICart> {
    throw new Error('Method not implemented.');
  }

  clearCart(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateItemQuantity(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<ICart> {
    throw new Error('Method not implemented.');
  }
}
