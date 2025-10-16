export interface ProductSearchQueryDto {
  q: string;
  page?: number;
  limit?: number;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductFilterDto {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  inStock?: boolean;
  page?: number;
  limit?: number;
}

export interface CategoryDto {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
}

export interface ProductRecommendationDto {
  userId: string;
  limit?: number;
  categories?: string[];
}
