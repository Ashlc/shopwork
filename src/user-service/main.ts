import { NestFactory } from '@nestjs/core';
import { UserModule } from '../modules/user/user.module';
import { ProductModule } from 'src/modules/product/product.module';
//pode ser removido caso for usar o metodo de executar cada comando manualmente, se nao da para executar cada um deles
//utilizando o respectivo start-'x'-service.ps1
async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(process.env.PORT || 3001);
  console.log(`🚀 User Service running on port ${process.env.PORT || 3001}`);
}
bootstrap();
