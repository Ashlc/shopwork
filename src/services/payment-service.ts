import { NestFactory } from '@nestjs/core';
import { PaymentModule } from '../modules/payment/payment.module';

async function bootstrap() {
  const port = process.env.PORT || 3006;
  const app = await NestFactory.create(PaymentModule);
  await app.listen(port);
  console.log(`🚀 Payment Service running on port ${port}`);
}

bootstrap();
