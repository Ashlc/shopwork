import { IReviewService } from 'src/interfaces/services';

abstract class ReviewService implements IReviewService {
  abstract addReview(productId: string, reviewData: any): Promise<any>;
  abstract getReviews(productId: string): Promise<any[]>;
  abstract updateReview(reviewId: string, reviewData: any): Promise<any>;
  abstract deleteReview(reviewId: string): Promise<void>;
}

export default ReviewService;
