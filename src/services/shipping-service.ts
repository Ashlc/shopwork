import { NestFactory } from '@nestjs/core';
import { ShippingModule } from '../modules/shipping/shipping.module';

async function bootstrap() {
  const port = process.env.PORT || 3007;
  const app = await NestFactory.create(ShippingModule);
  await app.listen(port);
  console.log(`🚀 Shipping Service running on port ${port}`);
}

bootstrap();
