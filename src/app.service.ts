import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { FrameworkService } from './framework/framework.service';
import { CatalogService } from './modules/catalog/catalog.service';
import { MailService } from './modules/mail/mail.service';
import { OrderService } from './modules/order/order.service';
import { PaymentService } from './modules/payment/payment.service';
import { ShippingService } from './modules/shipping/shipping.service';

@Injectable()
export class AppService {
  core: FrameworkService;

  constructor(private prisma: PrismaService) {
    this.core = new FrameworkService(
      null as any,
      new CatalogService(this.prisma),
      new MailService(),
      new OrderService(),
      new PaymentService(),
      null as any,
      null as any,
      new ShippingService(),
      null as any,
    );
  }
}
