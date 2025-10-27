import { NestFactory } from '@nestjs/core';
import { CatalogModule } from '../modules/catalog/catalog.module';

async function bootstrap() {
  const port = process.env.PORT || 3003;
  const app = await NestFactory.create(CatalogModule);
  await app.listen(port);
  console.log(`🚀 Catalog Service running on port ${port}`);
}

bootstrap();
