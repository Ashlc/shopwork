import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { IOrder } from 'src/interfaces/models';
import { OrderService } from './order.service';

@Controller('orders') // Changed to plural for RESTful convention
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('users/:userId')
  async createOrder(
    @Param('userId') userId: string,
    @Body()
    orderData: Omit<
      IOrder,
      'id' | 'status' | 'orderDate' | 'createdAt' | 'updatedAt'
    >,
  ) {
    return this.orderService.createOrder(userId, orderData);
  }

  @Get(':orderId')
  async getOrder(@Param('orderId') orderId: string) {
    return this.orderService.getOrder(orderId);
  }

  @Get('users/:userId')
  async listOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.listOrdersByUser(userId);
  }

  @Put(':orderId')
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() orderData: Partial<IOrder>,
  ) {
    return this.orderService.updateOrder(orderId, orderData);
  }

  @Delete(':orderId')
  async cancelOrder(@Param('orderId') orderId: string) {
    return this.orderService.cancelOrder(orderId);
  }
}
