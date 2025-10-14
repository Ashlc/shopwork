import { Injectable } from '@nestjs/common';
import { ICart } from 'src/interfaces/models';
import { ICartService } from 'src/interfaces/services';

@Injectable()
export class CartService implements ICartService {
  addItemToCart(userId: string, itemData: any): Promise<ICart> {
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
