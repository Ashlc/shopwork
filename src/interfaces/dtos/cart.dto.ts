import type { IProduct } from '../models';

export interface AddToCartDto {
  productId: string;
  quantity: number;
  product?: IProduct; // Optional, depending on your implementation
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface CartItemDto {
  id: string;
  productId: string;
  quantity: number;
  product?: IProduct;
}

export interface CartDto {
  userId: string;
  items: CartItemDto[];
}
