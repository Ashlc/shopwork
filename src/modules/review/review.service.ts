import { Injectable } from '@nestjs/common';
import BaseReviewService from 'src/framework/abstract/review.abstract';
import { IReview } from 'src/interfaces/models';

@Injectable()
export class ReviewService extends BaseReviewService {
  addReview(productId: string, reviewData: any): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
  getReviews(productId: string): Promise<IReview[]> {
    throw new Error('Method not implemented.');
  }
  updateReview(reviewId: string, reviewData: any): Promise<IReview> {
    throw new Error('Method not implemented.');
  }
  deleteReview(reviewId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
