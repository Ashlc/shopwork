import { Injectable } from '@nestjs/common';
import { IOrder } from 'src/interfaces/models';
import { IOrderService } from 'src/interfaces/services';

@Injectable()
export class OrderService implements IOrderService {
  private orders: Map<string, IOrder> = new Map();

  async createOrder(
    userId: string,
    orderData: Omit<
      IOrder,
      'id' | 'status' | 'orderDate' | 'createdAt' | 'updatedAt'
    >,
  ): Promise<IOrder> {
    // Gerar ID único usando timestamp + número aleatório
    const uniqueId = `order_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    const order: IOrder = {
      id: uniqueId,
      ...orderData,
      status: 'pending',
      orderDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.orders.set(order.id, order);
    console.log('✅ Pedido criado:', order.id, 'para usuário:', userId);
    return order;
  }

  async getOrder(orderId: string): Promise<IOrder> {
    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    console.log('✅ Pedido encontrado:', orderId);
    return order;
  }

  async updateOrder(orderId: string, orderData: Partial<IOrder>): Promise<IOrder> {
    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    const updatedOrder = {
      ...order,
      ...orderData,
      updatedAt: new Date().toISOString(),
    };

    this.orders.set(orderId, updatedOrder);
    console.log('✅ Pedido atualizado:', orderId);
    return updatedOrder;
  }

  async cancelOrder(orderId: string): Promise<void> {
    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      throw new Error('Não é possível cancelar um pedido já enviado ou entregue');
    }

    order.status = 'cancelled';
    order.updatedAt = new Date().toISOString();

    this.orders.set(orderId, order);
    console.log('✅ Pedido cancelado:', orderId);
  }

  async listOrdersByUser(userId: string): Promise<IOrder[]> {
    const userOrders = Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.orderDate || b.createdAt).getTime() - new Date(a.orderDate || a.createdAt).getTime());

    console.log(`✅ ${userOrders.length} pedidos encontrados para usuário:`, userId);
    return userOrders;
  }
}
