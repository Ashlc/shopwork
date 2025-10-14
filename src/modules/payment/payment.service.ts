import { Injectable } from '@nestjs/common';
import { IPayment } from 'src/interfaces/models';
import { IPaymentService } from 'src/interfaces/services';
import { PaymentMethod } from 'src/types';

@Injectable()
export class PaymentService implements IPaymentService {
  openPaymentProcess(orderId: string, method: PaymentMethod): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processPayment(paymentData: Omit<IPayment, 'id'>): Promise<IPayment> {
    throw new Error('Method not implemented.');
  }

  refundPayment(paymentId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getPaymentDetails(paymentId: string): Promise<IPayment> {
    throw new Error('Method not implemented.');
  }
}
