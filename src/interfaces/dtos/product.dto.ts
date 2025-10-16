import type { IProduct } from '../models';

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  sku: string;
  stock: number;
  images?: string[];
  attributes?: Record<string, any>;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  stock?: number;
  images?: string[];
  attributes?: Record<string, any>;
}

export interface ProductResponseDto extends Omit<IProduct, 'category'> {
  category?: {
    id: string;
    name: string;
  };
  reviews?: {
    rating: number;
    count: number;
  };
}
