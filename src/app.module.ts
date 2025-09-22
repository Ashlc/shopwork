import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FrameworkModule } from './framework/framework.module';
import { UserModule } from './abstract/user/user.module';
import { ProductModule } from './abstract/product/product.module';

@Module({
  imports: [FrameworkModule, UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
