import { Injectable } from '@nestjs/common';
import BaseOrderService from 'src/framework/abstract/order.abstract';
import { IOrder } from 'src/interfaces/models';

@Injectable()
export class OrderService extends BaseOrderService {
  createOrder(
    userId: string,
    orderData: Omit<
      IOrder,
      'id' | 'status' | 'orderDate' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<IOrder> {
    throw new Error('Method not implemented.');
  }

  getOrder(orderId: string): Promise<IOrder> {
    throw new Error('Method not implemented.');
  }

  updateOrder(orderId: string, orderData: Partial<IOrder>): Promise<IOrder> {
    throw new Error('Method not implemented.');
  }

  cancelOrder(orderId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  listOrdersByUser(userId: string): Promise<any[]> {
    throw new Error('Method not implemented.');
  }
}
