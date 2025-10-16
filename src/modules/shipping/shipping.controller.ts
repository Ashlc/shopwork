import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import type { IAddress, IShipment } from 'src/interfaces/models';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('calculate/:userId')
  calculateShippingCost(
    @Param('userId') userId: string,
    @Body() address: IAddress,
  ) {
    return this.shippingService.calculateShippingCost(userId, address);
  }

  @Post('shipments/:orderId')
  async createShipment(
    @Param('orderId') orderId: string,
    @Body()
    shipmentData: Omit<IShipment, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ) {
    return this.shippingService.createShipment(orderId, shipmentData);
  }

  @Get('shipments/:shipmentId')
  async getShipment(@Param('shipmentId') shipmentId: string) {
    return this.shippingService.getShipment(shipmentId);
  }

  @Put('shipments/:shipmentId')
  async updateShipment(
    @Param('shipmentId') shipmentId: string,
    @Body() shipmentData: Partial<IShipment>,
  ) {
    return this.shippingService.updateShipment(shipmentId, shipmentData);
  }

  @Get('track/:shipmentId')
  async trackShipment(@Param('shipmentId') shipmentId: string) {
    return this.shippingService.trackShipment(shipmentId);
  }
}
