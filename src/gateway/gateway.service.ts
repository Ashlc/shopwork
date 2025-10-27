import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  IAddress,
  ICart,
  IOrder,
  IPayment,
  IProduct,
  IShipment,
  IUser,
} from 'src/interfaces/models';
import { PaymentMethod } from 'src/types';
import { ServiceDiscoveryService } from './service-discovery.service';

@Injectable()
export class GatewayService {
  constructor(
    private readonly httpService: HttpService,
    private readonly serviceDiscovery: ServiceDiscoveryService,
  ) {}

  // ============================================================================
  // USER SERVICE METHODS
  // ============================================================================
  async createUser(userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> & { password: string }) {
    const url = this.serviceDiscovery.getServiceUrl('user');
    const response = await firstValueFrom(this.httpService.post(`${url}/users`, userData));
    return response.data;
  }

  async getUser(userId: string): Promise<IUser> {
    const url = this.serviceDiscovery.getServiceUrl('user');
    const response = await firstValueFrom(this.httpService.get(`${url}/users/${userId}`));
    return response.data;
  }

  async getAllUsers(): Promise<IUser[]> {
    const url = this.serviceDiscovery.getServiceUrl('user');
    const response = await firstValueFrom(
      this.httpService.get(`${url}/users`),
    );
    return response.data;
  }

  async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser> {
    const url = this.serviceDiscovery.getServiceUrl('user');
    const response = await firstValueFrom(this.httpService.put(`${url}/users/${userId}`, userData));
    return response.data;
  }

  async deleteUser(userId: string): Promise<void> {
    const url = this.serviceDiscovery.getServiceUrl('user');
    await firstValueFrom(this.httpService.delete(`${url}/users/${userId}`));
  }

  async getUserAddress(userId: string): Promise<IAddress> {
    const url = this.serviceDiscovery.getServiceUrl('user');
    const response = await firstValueFrom(this.httpService.get(`${url}/users/${userId}/address`));
    return response.data;
  }

  // ============================================================================
  // PRODUCT SERVICE METHODS
  // ============================================================================
  async addProduct(productData: any): Promise<IProduct> {
    const url = this.serviceDiscovery.getServiceUrl('product');
    const response = await firstValueFrom(this.httpService.post(`${url}/products`, productData));
    return response.data;
  }

  async getProduct(productId: string): Promise<IProduct> {
    const url = this.serviceDiscovery.getServiceUrl('product');
    const response = await firstValueFrom(this.httpService.get(`${url}/products/${productId}`));
    return response.data;
  }

  async getAllProducts(): Promise<IProduct[]> {
    const url = this.serviceDiscovery.getServiceUrl('product');
    const response = await firstValueFrom(this.httpService.get(`${url}/products`));
    return response.data;
  }

  async updateProduct(productId: string, productData: any): Promise<IProduct> {
    const url = this.serviceDiscovery.getServiceUrl('product');
    const response = await firstValueFrom(this.httpService.put(`${url}/products/${productId}`, productData));
    return response.data;
  }

  async deleteProduct(productId: string): Promise<void> {
    const url = this.serviceDiscovery.getServiceUrl('product');
    await firstValueFrom(this.httpService.delete(`${url}/products/${productId}`));
  }

  // ============================================================================
  // CATALOG SERVICE METHODS
  // ============================================================================
  async searchProducts(query: string): Promise<IProduct[]> {
    const url = this.serviceDiscovery.getServiceUrl('catalog');
    const response = await firstValueFrom(this.httpService.get(`${url}/catalog/search?q=${query}`));
    return response.data;
  }

  async getHighlights(): Promise<IProduct[]> {
    const url = this.serviceDiscovery.getServiceUrl('catalog');
    const response = await firstValueFrom(this.httpService.get(`${url}/catalog/highlights`));
    return response.data;
  }

  async getCategories() {
    const url = this.serviceDiscovery.getServiceUrl('catalog');
    const response = await firstValueFrom(this.httpService.get(`${url}/catalog/categories`));
    return response.data;
  }

  async recommendProducts(userId: string): Promise<IProduct[]> {
    const url = this.serviceDiscovery.getServiceUrl('catalog');
    const response = await firstValueFrom(this.httpService.get(`${url}/catalog/recommendations/${userId}`));
    return response.data;
  }

  async getRelatedProducts(productId: string): Promise<IProduct[]> {
    const url = this.serviceDiscovery.getServiceUrl('catalog');
    const response = await firstValueFrom(this.httpService.get(`${url}/catalog/related/${productId}`));
    return response.data;
  }

  async getNewArrivals(): Promise<IProduct[]> {
    const url = this.serviceDiscovery.getServiceUrl('catalog');
    const response = await firstValueFrom(this.httpService.get(`${url}/catalog/new-arrivals`));
    return response.data;
  }

  // ============================================================================
  // CART SERVICE METHODS
  // ============================================================================
  async addToCart(userId: string, itemData: any): Promise<ICart> {
    const url = this.serviceDiscovery.getServiceUrl('cart');
    const response = await firstValueFrom(
      this.httpService.post(`${url}/cart/${userId}/items`, itemData),
    );
    return response.data;
  }

  async getCart(userId: string): Promise<ICart> {
    const url = this.serviceDiscovery.getServiceUrl('cart');
    const response = await firstValueFrom(
      this.httpService.get(`${url}/cart/${userId}`),
    );
    return response.data;
  }

  async removeFromCart(userId: string, itemId: string): Promise<ICart> {
    const url = this.serviceDiscovery.getServiceUrl('cart');
    const response = await firstValueFrom(
      this.httpService.delete(`${url}/cart/${userId}/items/${itemId}`),
    );
    return response.data;
  }

  async clearCart(userId: string): Promise<void> {
    const url = this.serviceDiscovery.getServiceUrl('cart');
    await firstValueFrom(this.httpService.delete(`${url}/cart/${userId}`));
  }

  async updateItemQuantity(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<ICart> {
    const url = this.serviceDiscovery.getServiceUrl('cart');
    const response = await firstValueFrom(
      this.httpService.put(`${url}/cart/${userId}/items/${itemId}`, {
        quantity,
      }),
    );
    return response.data;
  }

  // ============================================================================
  // ORDER SERVICE METHODS
  // ============================================================================
  async createOrder(userId: string, orderData: any): Promise<IOrder> {
    const url = this.serviceDiscovery.getServiceUrl('order');
    const response = await firstValueFrom(this.httpService.post(`${url}/orders`, orderData));
    return response.data;
  }

  async getOrder(orderId: string): Promise<IOrder> {
    const url = this.serviceDiscovery.getServiceUrl('order');
    const response = await firstValueFrom(this.httpService.get(`${url}/orders/${orderId}`));
    return response.data;
  }

  async updateOrder(orderId: string, orderData: any): Promise<IOrder> {
    const url = this.serviceDiscovery.getServiceUrl('order');
    const response = await firstValueFrom(this.httpService.put(`${url}/orders/${orderId}`, orderData));
    return response.data;
  }

  async cancelOrder(orderId: string): Promise<void> {
    const url = this.serviceDiscovery.getServiceUrl('order');
    await firstValueFrom(this.httpService.delete(`${url}/orders/${orderId}`));
  }

  async listOrdersByUser(userId: string): Promise<IOrder[]> {
    const url = this.serviceDiscovery.getServiceUrl('order');
    const response = await firstValueFrom(this.httpService.get(`${url}/orders/user/${userId}`));
    return response.data;
  }

  // ============================================================================
  // PAYMENT SERVICE METHODS
  // ============================================================================
  async openPaymentProcess(orderId: string, method: PaymentMethod): Promise<string> {
    const url = this.serviceDiscovery.getServiceUrl('payment');
    const response = await firstValueFrom(this.httpService.post(`${url}/payments/process`, {
      orderId,
      method,
    }));
    return response.data.paymentId;
  }

  async processPayment(paymentData: any): Promise<IPayment> {
    const url = this.serviceDiscovery.getServiceUrl('payment');
    const response = await firstValueFrom(this.httpService.post(`${url}/payments`, paymentData));
    return response.data;
  }

  async refundPayment(paymentId: string): Promise<any> {
    const url = this.serviceDiscovery.getServiceUrl('payment');
    const response = await firstValueFrom(this.httpService.post(`${url}/payments/${paymentId}/refund`));
    return response.data;
  }

  async getPaymentDetails(paymentId: string): Promise<IPayment> {
    const url = this.serviceDiscovery.getServiceUrl('payment');
    const response = await firstValueFrom(this.httpService.get(`${url}/payments/${paymentId}`));
    return response.data;
  }

  // ============================================================================
  // SHIPPING SERVICE METHODS
  // ============================================================================
  async createShipment(orderId: string, shipmentData: any): Promise<IShipment> {
    const url = this.serviceDiscovery.getServiceUrl('shipping');
    const response = await firstValueFrom(this.httpService.post(`${url}/shipments`, {
      orderId,
      ...shipmentData,
    }));
    return response.data;
  }

  async getShipment(shipmentId: string): Promise<IShipment> {
    const url = this.serviceDiscovery.getServiceUrl('shipping');
    const response = await firstValueFrom(this.httpService.get(`${url}/shipments/${shipmentId}`));
    return response.data;
  }

  async updateShipment(shipmentId: string, shipmentData: any): Promise<IShipment> {
    const url = this.serviceDiscovery.getServiceUrl('shipping');
    const response = await firstValueFrom(this.httpService.put(`${url}/shipments/${shipmentId}`, shipmentData));
    return response.data;
  }

  async trackShipment(shipmentId: string): Promise<IShipment> {
    const url = this.serviceDiscovery.getServiceUrl('shipping');
    const response = await firstValueFrom(this.httpService.get(`${url}/shipments/${shipmentId}/track`));
    return response.data;
  }

  async calculateShippingCost(userId: string, address: IAddress): Promise<number> {
    const url = this.serviceDiscovery.getServiceUrl('shipping');
    const response = await firstValueFrom(this.httpService.post(`${url}/shipping/calculate`, {
      userId,
      address,
    }));
    return response.data.cost;
  }

  // ============================================================================
  // REVIEW SERVICE METHODS
  // ============================================================================
  async addReview(productId: string, reviewData: any): Promise<any> {
    const url = this.serviceDiscovery.getServiceUrl('review');
    const response = await firstValueFrom(this.httpService.post(`${url}/reviews`, {
      productId,
      ...reviewData,
    }));
    return response.data;
  }

  async getReviews(productId: string): Promise<any[]> {
    const url = this.serviceDiscovery.getServiceUrl('review');
    const response = await firstValueFrom(this.httpService.get(`${url}/reviews/product/${productId}`));
    return response.data;
  }

  async updateReview(reviewId: string, reviewData: any): Promise<any> {
    const url = this.serviceDiscovery.getServiceUrl('review');
    const response = await firstValueFrom(this.httpService.put(`${url}/reviews/${reviewId}`, reviewData));
    return response.data;
  }

  async deleteReview(reviewId: string): Promise<void> {
    const url = this.serviceDiscovery.getServiceUrl('review');
    await firstValueFrom(this.httpService.delete(`${url}/reviews/${reviewId}`));
  }

  // ============================================================================
  // MAIL SERVICE METHODS
  // ============================================================================
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const url = this.serviceDiscovery.getServiceUrl('mail');
    await firstValueFrom(this.httpService.post(`${url}/mail/send`, {
      to,
      subject,
      body,
    }));
  }

  async sendOrderConfirmation(userId: string, orderId: string): Promise<void> {
    const url = this.serviceDiscovery.getServiceUrl('mail');
    await firstValueFrom(this.httpService.post(`${url}/mail/order-confirmation`, {
      userId,
      orderId,
    }));
  }

  async sendShippingInformation(userId: string, shipment: IShipment): Promise<void> {
    const url = this.serviceDiscovery.getServiceUrl('mail');
    await firstValueFrom(this.httpService.post(`${url}/mail/shipping-info`, {
      userId,
      shipment,
    }));
  }

  // ============================================================================
  // COMPLEX BUSINESS OPERATIONS (Orquestração)
  // ============================================================================
  async placeOrder(userId: string, method: PaymentMethod) {
    // 1. Buscar carrinho
    const cart = await this.getCart(userId);
    if (!cart || cart.products.length === 0) {
      throw new Error('Cart is empty');
    }

    // 2. Buscar endereço do usuário
    const address = await this.getUserAddress(userId);

    // 3. Calcular frete
    const shippingCost = await this.calculateShippingCost(userId, address);

    // 4. Calcular total
    const productTotal = cart.products.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const tax = 0.1 * productTotal;
    const totalAmount = productTotal + shippingCost + tax;

    // 5. Criar pedido
    const orderData = {
      userId,
      products: cart.products.map(item => item.product),
      productTotal,
      shippingCost,
      taxes: tax,
      totalAmount,
    };

    const order = await this.createOrder(userId, orderData);

    // 6. Processar pagamento
    const paymentId = await this.openPaymentProcess(order.id, method);

    // 7. Limpar carrinho
    await this.clearCart(userId);

    return {
      order,
      paymentId,
    };
  }

  async confirmOrder(paymentId: string) {
    const payment = await this.getPaymentDetails(paymentId);
    if (payment.status !== 'completed') {
      throw new Error('Payment not completed');
    }

    if (!payment.userId) {
      throw new Error('User ID not found');
    }

    await this.sendOrderConfirmation(payment.userId, payment.orderId);

    return payment;
  }

  async updateShipmentStatus(shipmentId: string, status: string) {
    const shipment = await this.updateShipment(shipmentId, { status });

    if (shipment && shipment.userId) {
      await this.sendShippingInformation(shipment.userId, shipment);
    }

    return shipment;
  }
}