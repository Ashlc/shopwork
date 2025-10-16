abstract class BaseReviewService {
  abstract addReview(productId: string, reviewData: any): Promise<any>;
  abstract getReviews(productId: string): Promise<any[]>;
  abstract updateReview(reviewId: string, reviewData: any): Promise<any>;
  abstract deleteReview(reviewId: string): Promise<void>;
}

export default BaseReviewService;
