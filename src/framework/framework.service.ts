import { Injectable } from '@nestjs/common';
import type {
  ICartService,
  ICatalogService,
  IProductService,
  IReviewService,
  IUserService,
} from 'src/interfaces/services';

@Injectable()
export class FrameworkService {
  constructor(
    private readonly userService: IUserService,
    private readonly productService: IProductService,
    private readonly cartService: ICartService,
    private readonly reviewService: IReviewService,
    private readonly catalogService: ICatalogService,
  ) {}
}
