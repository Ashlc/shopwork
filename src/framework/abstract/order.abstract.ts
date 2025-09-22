import { IOrder } from 'src/interfaces/models';
import { IOrderService } from 'src/interfaces/services';

abstract class OrderService implements IOrderService {
  abstract createOrder(
    userId: string,
    orderData: Omit<
      IOrder,
      'id' | 'status' | 'orderDate' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<IOrder>;
  abstract getOrder(orderId: string): Promise<IOrder>;
  abstract updateOrder(
    orderId: string,
    orderData: Partial<IOrder>,
  ): Promise<IOrder>;
  abstract cancelOrder(orderId: string): Promise<void>;
  abstract listOrdersByUser(userId: string): Promise<any[]>;
}

export default OrderService;
