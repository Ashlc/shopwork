import { Injectable } from '@nestjs/common';
import { IShipment } from 'src/interfaces/models';
import { PaymentMethod } from 'src/types';
import { CartService } from '../modules/cart/cart.service';
import { CatalogService } from '../modules/catalog/catalog.service';
import { MailService } from '../modules/mail/mail.service';
import { OrderService } from '../modules/order/order.service';
import { PaymentService } from '../modules/payment/payment.service';
import { ProductService } from '../modules/product/product.service';
import { ReviewService } from '../modules/review/review.service';
import { ShippingService } from '../modules/shipping/shipping.service';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class FrameworkService {
  constructor(
    private readonly cartService: CartService,
    private readonly catalogService: CatalogService,
    private readonly mailService: MailService,
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
    private readonly productService: ProductService,
    private readonly reviewService: ReviewService,
    private readonly shippingService: ShippingService,
    private readonly userService: UserService,
  ) {}

  async placeOrder(userId: string, method: PaymentMethod) {
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

    const data = {
      userId,
      products,
      productTotal: total,
      shippingCost: shipping,
      taxes: tax,
      totalAmount: total + shipping + tax,
    };

    const order = await this.orderService.createOrder(userId, data);
    const payment = await this.paymentService.openPaymentProcess(
      order.id,
      method,
    );

    await this.cartService.clearCart(userId);

    return {
      order,
      payment,
    };
  }

  async updateShipment(shipmentId: string, status: Partial<IShipment>) {
    const shipment = await this.shippingService.updateShipment(
      shipmentId,
      status,
    );

    if (shipment && shipment.userId) {
      await this.mailService.sendShippingInformation(shipment.userId, shipment);
    }

    return shipment;
  }

  async confirmOrder(paymentId: string) {
    const payment = await this.paymentService.getPaymentDetails(paymentId);
    if (payment.status !== 'completed') {
      throw new Error('Payment not completed');
    }

    if (!payment.userId) {
      throw new Error('User ID not found');
    }

    await this.mailService.sendOrderConfirmation(
      payment.userId,
      payment.orderId,
    );

    return payment;
  }

  async closeOrder(orderId: string) {
    const order = await this.orderService.getOrder(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== 'delivered' && order.status !== 'cancelled') {
      throw new Error('Order not delivered or cancelled yet');
    }

    return this.mailService.sendClosureConfirmation(order.userId, order.id);
  }
}
