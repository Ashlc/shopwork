import { Module } from '@nestjs/common';
import { CartModule } from '../modules/cart/cart.module';
import { CatalogModule } from '../modules/catalog/catalog.module';
import { MailModule } from '../modules/mail/mail.module';
import { OrderModule } from '../modules/order/order.module';
import { PaymentModule } from '../modules/payment/payment.module';
import { ProductModule } from '../modules/product/product.module';
import { ReviewModule } from '../modules/review/review.module';
import { ShippingModule } from '../modules/shipping/shipping.module';
import { UserModule } from '../modules/user/user.module';
import { FrameworkController } from './framework.controller';
import { FrameworkService } from './framework.service';

@Module({
  imports: [
    CartModule,
    CatalogModule,
    MailModule,
    OrderModule,
    PaymentModule,
    ProductModule,
    ReviewModule,
    ShippingModule,
    UserModule,
  ],
  controllers: [FrameworkController],
  providers: [FrameworkService],
  exports: [FrameworkService],
})
export class FrameworkModule {}
