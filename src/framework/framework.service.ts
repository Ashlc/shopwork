import { Injectable } from '@nestjs/common';
import { IShipment } from 'src/interfaces/models';
import { PaymentMethod } from 'src/types';
import BaseCartService from './abstract/cart.abstract';
import BaseCatalogService from './abstract/catalog.abstract';
import BaseMailService from './abstract/mail.abstract';
import BaseOrderService from './abstract/order.abstract';
import BasePaymentService from './abstract/payment.abstract';
import BaseProductService from './abstract/product.abstract';
import BaseReviewService from './abstract/review.abstract';
import BaseShippingService from './abstract/shipping.abstract';
import BaseUserService from './abstract/user.abstract';

@Injectable()
export class FrameworkService {
  constructor(
    private readonly cartService: BaseCartService,
    private readonly catalogService: BaseCatalogService,
    private readonly mailService: BaseMailService,
    private readonly orderService: BaseOrderService,
    private readonly paymentService: BasePaymentService,
    private readonly productService: BaseProductService,
    private readonly reviewService: BaseReviewService,
    private readonly shippingService: BaseShippingService,
    private readonly userService: BaseUserService,
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
