import { Injectable } from '@nestjs/common';
import BasePaymentService from 'src/framework/abstract/payment.abstract';
import { IPayment } from 'src/interfaces/models';
import { PaymentMethod } from 'src/types';

@Injectable()
export class PaymentService extends BasePaymentService {
  openPaymentProcess(orderId: string, method: PaymentMethod): Promise<string> {
    throw new Error('Method not implemented.');
  }

  processPayment(paymentData: Omit<IPayment, 'id'>): Promise<IPayment> {
    throw new Error('Method not implemented.');
  }

  refundPayment(paymentId: string): Promise<IPayment> {
    throw new Error('Method not implemented.');
  }

  getPaymentDetails(paymentId: string): Promise<IPayment> {
    throw new Error('Method not implemented.');
  }
}
