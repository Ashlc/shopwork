import { ICart } from 'src/interfaces/models';

abstract class BaseCartService {
  abstract addToCart(
    userId: string,
    items: { productId: string; quantity: number }[],
  ): Promise<ICart>;

  abstract removeItemFromCart(userId: string, itemId: string): Promise<ICart>;

  abstract getCart(userId: string): Promise<ICart>;

  abstract clearCart(userId: string): Promise<void>;

  abstract updateItemQuantity(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<ICart>;
}

export default BaseCartService;
