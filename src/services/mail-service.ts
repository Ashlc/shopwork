import { NestFactory } from '@nestjs/core';
import { MailModule } from '../modules/mail/mail.module';

async function bootstrap() {
  const port = process.env.PORT || 3008;
  const app = await NestFactory.create(MailModule);
  await app.listen(port);
  console.log(`🚀 Mail Service running on port ${port}`);
}

bootstrap();
