import { PaymentMethod } from 'src/types';
import {
  IAddress,
  ICart,
  ICategory,
  IOrder,
  IPayment,
  IProduct,
  IShipment,
  IUser,
} from './models';

// ============================================================================
// FOUNDATION SERVICES
// Core entity management services with no dependencies on other business entities
// ============================================================================

export interface IUserService {
  createUser(
    userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> & {
      password: string;
    },
  ): Promise<IUser>;
  getUserInfo(userId: string): Promise<IUser>;
  updateUser(userId: string, userData: Partial<IUser>): Promise<IUser>;
  deleteUser(userId: string): Promise<void>;
  getAddress(userId: string): Promise<IAddress>;
}

export interface IProductService {
  addProduct(productData: any): Promise<any>;
  getProduct(productId: string): Promise<any>;
  updateProduct(productId: string, productData: any): Promise<any>;
  deleteProduct(productId: string): Promise<void>;
}

export interface IMailService {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
  sendOrderConfirmation(userId: string, orderId: string): Promise<void>;
  sendClosureConfirmation(userId: string, orderId: string): Promise<void>;
  sendShippingInformation(userId: string, shipment: IShipment): Promise<void>;
  sendPasswordResetEmail(userId: string, resetToken: string): Promise<void>;
}

// ============================================================================
// CATALOG SERVICES
// Product discovery and categorization services (depends on products)
// ============================================================================

export interface ICatalogService {
  searchProducts(query: string): Promise<IProduct[]>;
  filterProducts(filters: any): Promise<IProduct[]>;
  getHighlights(): Promise<IProduct[]>;
  getProductCategories(): Promise<ICategory[]>;
  recommendProducts(userId: string): Promise<IProduct[]>;
  getRelatedProducts(productId: string): Promise<IProduct[]>;
  getNewArrivals(): Promise<IProduct[]>;
}

// ============================================================================
// USER INTERACTION SERVICES
// Services that handle user interactions with products
// ============================================================================

export interface ICartService {
  addItemToCart(userId: string, itemData: any): Promise<ICart>;
  removeItemFromCart(userId: string, itemId: string): Promise<ICart>;
  getCart(userId: string): Promise<ICart>;
  clearCart(userId: string): Promise<void>;
  updateItemQuantity(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<ICart>;
}

export interface IReviewService {
  addReview(productId: string, reviewData: any): Promise<any>;
  getReviews(productId: string): Promise<any[]>;
  updateReview(reviewId: string, reviewData: any): Promise<any>;
  deleteReview(reviewId: string): Promise<void>;
}

// ============================================================================
// TRANSACTION SERVICES
// Order fulfillment and payment processing (depends on users, products, and cart)
// ============================================================================

export interface IOrderService {
  createOrder(
    userId: string,
    orderData: Omit<
      IOrder,
      'id' | 'status' | 'orderDate' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<IOrder>;
  getOrder(orderId: string): Promise<IOrder>;
  updateOrder(orderId, orderData: Partial<IOrder>): Promise<IOrder>;
  cancelOrder(orderId: string): Promise<void>;
  listOrdersByUser(userId: string): Promise<IOrder[]>;
}

export interface IPaymentService {
  openPaymentProcess(orderId: string, method: PaymentMethod): Promise<string>;
  processPayment(paymentData: Omit<IPayment, 'id'>): Promise<IPayment>;
  refundPayment(paymentId: string): Promise<any>;
  getPaymentDetails(paymentId: string): Promise<IPayment>;
}

export interface IShippingService {
  createShipment(
    orderId: string,
    shipmentData: Omit<IShipment, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<IShipment>;
  getShipment(shipmentId: string): Promise<IShipment>;
  updateShipment(
    shipmentId: string,
    shipmentData: Partial<IShipment>,
  ): Promise<IShipment>;
  trackShipment(shipmentId: string): Promise<IShipment>;
  calculateShippingCost(userId: string, address: IAddress): number;
}
