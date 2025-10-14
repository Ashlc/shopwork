import { Injectable } from '@nestjs/common';
import { IOrder } from 'src/interfaces/models';
import { IOrderService } from 'src/interfaces/services';

@Injectable()
export class OrderService implements IOrderService {
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
