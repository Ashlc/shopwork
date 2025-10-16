import { IPayment } from 'src/interfaces/models';
import { PaymentMethod } from 'src/types';

abstract class BasePaymentService {
  abstract openPaymentProcess(
    orderId: string,
    method: PaymentMethod,
  ): Promise<string>;
  abstract processPayment(paymentData: Omit<IPayment, 'id'>): Promise<IPayment>;
  abstract refundPayment(paymentId: string): Promise<any>;
  abstract getPaymentDetails(paymentId: string): Promise<IPayment>;
}

export default BasePaymentService;
