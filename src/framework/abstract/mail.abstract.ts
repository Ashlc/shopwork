import { IShipment } from 'src/interfaces/models';

abstract class BaseMailService {
  abstract sendEmail(to: string, subject: string, body: string): Promise<void>;
  abstract sendOrderConfirmation(
    userId: string,
    orderId: string,
  ): Promise<void>;
  abstract sendClosureConfirmation(
    userId: string,
    orderId: string,
  ): Promise<void>;
  abstract sendShippingInformation(
    userId: string,
    shipment: IShipment,
  ): Promise<void>;
  abstract sendPasswordResetEmail(
    userId: string,
    resetToken: string,
  ): Promise<void>;
}

export default BaseMailService;
