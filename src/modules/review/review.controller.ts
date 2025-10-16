import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('products/:productId')
  async addReview(
    @Param('productId') productId: string,
    @Body() reviewData: any,
  ) {
    return this.reviewService.addReview(productId, reviewData);
  }

  @Get('products/:productId')
  async getReviews(@Param('productId') productId: string) {
    return this.reviewService.getReviews(productId);
  }

  @Put(':reviewId')
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() reviewData: any,
  ) {
    return this.reviewService.updateReview(reviewId, reviewData);
  }

  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }
}
