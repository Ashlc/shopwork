import { NestFactory } from '@nestjs/core';
import { OrderModule } from '../modules/order/order.module';

async function bootstrap() {
  const port = process.env.PORT || 3005;
  const app = await NestFactory.create(OrderModule);
  await app.listen(port);
  console.log(`🚀 Order Service running on port ${port}`);
}

bootstrap();
