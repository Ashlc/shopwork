import { NestFactory } from '@nestjs/core';
import { CartModule } from '../modules/cart/cart.module';

async function bootstrap() {
  const port = process.env.PORT || 3004;
  const app = await NestFactory.create(CartModule);
  await app.listen(port);
  console.log(`🚀 Cart Service running on port ${port}`);
}

bootstrap();
