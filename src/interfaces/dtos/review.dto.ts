export interface CreateReviewDto {
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
}

export interface UpdateReviewDto {
  rating?: number;
  title?: string;
  comment?: string;
  images?: string[];
}

export interface ReviewResponseDto {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    name: string;
    avatar?: string;
  };
}
