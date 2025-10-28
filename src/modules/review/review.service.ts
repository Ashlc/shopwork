import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import BaseReviewService from 'src/framework/abstract/review.abstract';
import { IReview } from 'src/interfaces/models';

@Injectable()
export class ReviewService extends BaseReviewService {
  constructor(private prisma: PrismaService) {
    super();
  }

  async addReview(productId: string, reviewData: any): Promise<IReview> {
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new BadRequestException(
        'Avaliação deve estar entre 1 e 5 estrelas',
      );
    }

    // Verificar se produto existe
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const review = await this.prisma.review.create({
      data: {
        productId,
        userId: reviewData.userId,
        rating: reviewData.rating,
        comment: reviewData.comment || '',
      },
    });

    console.log(
      '✅ Avaliação adicionada ao banco:',
      review.id,
      'para produto:',
      productId,
    );
    return this.mapToIReview(review);
  }

  async getReviews(productId: string): Promise<IReview[]> {
    const reviews = await this.prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });

    console.log(
      `✅ ${reviews.length} avaliações encontradas para produto:`,
      productId,
    );
    return reviews.map((review) => this.mapToIReview(review));
  }

  async updateReview(reviewId: string, reviewData: any): Promise<IReview> {
    const existingReview = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    if (reviewData.rating && (reviewData.rating < 1 || reviewData.rating > 5)) {
      throw new BadRequestException(
        'Avaliação deve estar entre 1 e 5 estrelas',
      );
    }

    const updateData: any = {};
    if (reviewData.rating !== undefined) updateData.rating = reviewData.rating;
    if (reviewData.comment !== undefined)
      updateData.comment = reviewData.comment;

    const updatedReview = await this.prisma.review.update({
      where: { id: reviewId },
      data: updateData,
    });

    console.log('✅ Avaliação atualizada no banco:', reviewId);
    return this.mapToIReview(updatedReview);
  }

  async deleteReview(reviewId: string): Promise<void> {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new NotFoundException('Avaliação não encontrada');
    }

    await this.prisma.review.delete({
      where: { id: reviewId },
    });

    console.log('✅ Avaliação removida do banco:', reviewId);
  }

  private mapToIReview(review: any): IReview {
    return {
      id: review.id,
      userId: review.userId,
      productId: review.productId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString(),
      updatedAt: review.updatedAt.toISOString(),
    };
  }
}
