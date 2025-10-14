import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController, ShippingCalculationController } from './shipping.controller';

@Module({
  controllers: [ShippingController, ShippingCalculationController],
  providers: [ShippingService],
})
export class ShippingModule {}
