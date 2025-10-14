import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FrameworkModule } from './framework/framework.module';
import { CartModule } from './modules/cart/cart.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { MailModule } from './modules/mail/mail.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductModule } from './modules/product/product.module';
import { ReviewModule } from './modules/review/review.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    FrameworkModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
