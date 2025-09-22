import { IPayment } from 'src/interfaces/models';
import { IPaymentService } from 'src/interfaces/services';
import { PaymentMethod } from 'src/types';

abstract class PaymentService implements IPaymentService {
  abstract openPaymentProcess(
    orderId: string,
    method: PaymentMethod,
  ): Promise<string>;
  abstract processPayment(paymentData: Omit<IPayment, 'id'>): Promise<IPayment>;
  abstract refundPayment(paymentId: string): Promise<any>;
  abstract getPaymentStatus(paymentId: string): Promise<string>;
}

export default PaymentService;
