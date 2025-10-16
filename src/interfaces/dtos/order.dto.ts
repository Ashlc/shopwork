import type { IProduct } from 'src/interfaces/models';
import type { OrderStatus } from 'src/types';

export interface CreateOrderDto {
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

export interface OrderResponseDto {
  id: string;
  userId: string;
  products: {
    product: IProduct;
    quantity: number;
  }[];
  status: OrderStatus;
  totalAmount: number;
  shippingCost: number;
  tax: number;
  createdAt: Date;
  updatedAt: Date;
}
