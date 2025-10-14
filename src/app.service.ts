import { Injectable } from '@nestjs/common';
import { FrameworkService } from './framework/framework.service';
import { CartService } from './modules/cart/cart.service';
import { CatalogService } from './modules/catalog/catalog.service';
import { MailService } from './modules/mail/mail.service';
import { OrderService } from './modules/order/order.service';
import { PaymentService } from './modules/payment/payment.service';
import { ProductService } from './modules/product/product.service';
import { ReviewService } from './modules/review/review.service';
import { ShippingService } from './modules/shipping/shipping.service';
import { UserService } from './modules/user/user.service';

@Injectable()
export class AppService {
  core = new FrameworkService(
    new CartService(),
    new CatalogService(),
    new MailService(),
    new OrderService(),
    new PaymentService(),
    new ProductService(),
    new ReviewService(),
    new ShippingService(),
    new UserService(),
  );
}
