import { Injectable } from '@nestjs/common';
import { IReviewService } from 'src/interfaces/services';

@Injectable()
export class ReviewService implements IReviewService {
  addReview(productId: string, reviewData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getReviews(productId: string): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
  updateReview(reviewId: string, reviewData: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  deleteReview(reviewId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
