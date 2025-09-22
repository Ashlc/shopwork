import { ICart } from 'src/interfaces/models';
import { ICartService } from 'src/interfaces/services';

abstract class CartService implements ICartService {
  abstract addItemToCart(userId: string, itemData: any): Promise<ICart>;

  abstract removeItemFromCart(userId: string, itemId: string): Promise<ICart>;

  abstract getCart(userId: string): Promise<ICart>;

  abstract clearCart(userId: string): Promise<void>;

  abstract updateItemQuantity(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<ICart>;
}

export default CartService;
