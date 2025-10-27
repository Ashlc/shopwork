import { NestFactory } from '@nestjs/core';
import { UserModule } from '../modules/user/user.module';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create(UserModule);
  await app.listen(port);
  console.log(`🚀 User Service running on port ${port}`);
}

bootstrap();
