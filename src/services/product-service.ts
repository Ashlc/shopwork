import { NestFactory } from '@nestjs/core';
import { ProductModule } from '../modules/product/product.module';

async function bootstrap() {
  const port = process.env.PORT || 3002;
  const app = await NestFactory.create(ProductModule);
  await app.listen(port);
  console.log(`🚀 Product Service running on port ${port}`);
}

bootstrap();
