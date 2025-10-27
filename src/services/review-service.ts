import { NestFactory } from '@nestjs/core';
import { ReviewModule } from '../modules/review/review.module';

async function bootstrap() {
  const port = process.env.PORT || 3009;
  const app = await NestFactory.create(ReviewModule);
  await app.listen(port);
  console.log(`🚀 Review Service running on port ${port}`);
}

bootstrap();
