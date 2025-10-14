import { Injectable } from '@nestjs/common';
import { IReviewService } from 'src/interfaces/services';
import { IReview } from 'src/interfaces/models';

@Injectable()
export class ReviewService implements IReviewService {
  private reviews: Map<string, IReview> = new Map();

  async addReview(productId: string, reviewData: any): Promise<IReview> {
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Avaliação deve estar entre 1 e 5 estrelas');
    }

    const review: IReview = {
      id: `review_${Date.now()}`,
      productId,
      userId: reviewData.userId,
      rating: reviewData.rating,
      comment: reviewData.comment || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.reviews.set(review.id, review);
    console.log('✅ Avaliação adicionada:', review.id, 'para produto:', productId);
    return review;
  }

  async getReviews(productId: string): Promise<IReview[]> {
    const productReviews = Array.from(this.reviews.values())
      .filter(review => review.productId === productId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    console.log(`✅ ${productReviews.length} avaliações encontradas para produto:`, productId);
    return productReviews;
  }

  async updateReview(reviewId: string, reviewData: any): Promise<IReview> {
    const review = this.reviews.get(reviewId);
    
    if (!review) {
      throw new Error('Avaliação não encontrada');
    }

    if (reviewData.rating && (reviewData.rating < 1 || reviewData.rating > 5)) {
      throw new Error('Avaliação deve estar entre 1 e 5 estrelas');
    }

    const updatedReview = {
      ...review,
      ...reviewData,
      updatedAt: new Date().toISOString(),
    };

    this.reviews.set(reviewId, updatedReview);
    console.log('✅ Avaliação atualizada:', reviewId);
    return updatedReview;
  }

  async deleteReview(reviewId: string): Promise<void> {
    const review = this.reviews.get(reviewId);
    
    if (!review) {
      throw new Error('Avaliação não encontrada');
    }

    this.reviews.delete(reviewId);
    console.log('✅ Avaliação removida:', reviewId);
  }
}
