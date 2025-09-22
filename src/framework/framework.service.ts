import { Injectable } from '@nestjs/common';
import type {
  ICartService,
  ICatalogService,
  IOrderService,
  IProductService,
  IReviewService,
  IShippingService,
  IUserService,
} from 'src/interfaces/services';

@Injectable()
export class FrameworkService {
  constructor(
    private readonly userService: IUserService,
    private readonly productService: IProductService,
    private readonly cartService: ICartService,
    private readonly reviewService: IReviewService,
    private readonly catalogService: ICatalogService,
    private readonly orderService: IOrderService,
    private readonly shippingService: IShippingService,
  ) {}
  async createOrder(userId: string) {
    const cart = await this.cartService.getCart(userId);

    if (!cart || cart.products.length === 0) {
      throw new Error('Cart is empty');
    }

    const total = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const address = await this.userService.getAddress(userId);
    const shipping = this.shippingService.calculateShippingCost(
      userId,
      address,
    );

    const products = cart.products.map((item) => item.product);

    const tax = 0.1 * total;

    const orderData = {
      userId,
      products,
      productTotal: total,
      shippingCost: shipping,
      taxes: tax,
      totalAmount: total + shipping + tax,
    };

    const order = await this.orderService.createOrder(userId, orderData);

    await this.cartService.clearCart(userId);

    return order;
  }
}
