import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ShippingService } from './shipping.service';

@Controller('shipments')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  async createShipment(@Body() shipmentData: any) {
    return this.shippingService.createShipment(shipmentData.orderId, shipmentData);
  }

  @Get(':id')
  async getShipment(@Param('id') id: string) {
    return this.shippingService.getShipment(id);
  }

  @Put(':id')
  async updateShipment(@Param('id') id: string, @Body() shipmentData: any) {
    return this.shippingService.updateShipment(id, shipmentData);
  }

  @Get(':id/track')
  async trackShipment(@Param('id') id: string) {
    return this.shippingService.trackShipment(id);
  }
}

@Controller('shipping')
export class ShippingCalculationController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('calculate')
  async calculateShipping(@Body() body: { userId: string; address: any }) {
    const cost = this.shippingService.calculateShippingCost(body.userId, body.address);
    return { cost };
  }
}
