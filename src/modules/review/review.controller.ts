import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async addReview(@Body() body: { productId: string; reviewData: any }) {
    return this.reviewService.addReview(body.productId, body.reviewData);
  }

  @Get('product/:productId')
  async getReviews(@Param('productId') productId: string) {
    return this.reviewService.getReviews(productId);
  }

  @Put(':id')
  async updateReview(@Param('id') id: string, @Body() reviewData: any) {
    return this.reviewService.updateReview(id, reviewData);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
