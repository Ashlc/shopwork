import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: any) {
    return this.orderService.createOrder(orderData.userId, orderData);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Put(':id')
  async updateOrder(@Param('id') id: string, @Body() orderData: any) {
    return this.orderService.updateOrder(id, orderData);
  }

  @Delete(':id')
  async cancelOrder(@Param('id') id: string) {
    return this.orderService.cancelOrder(id);
  }

  @Get('user/:userId')
  async listOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.listOrdersByUser(userId);
  }
}
