import { Injectable } from '@nestjs/common';
import { IMailService } from 'src/interfaces/services';

@Injectable()
export class MailService implements IMailService {
  sendEmail(to: string, subject: string, body: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sendBulkEmail(
    recipients: string[],
    subject: string,
    body: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sendOrderConfirmation(userId: string, orderId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sendClosureConfirmation(userId: string, orderId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sendShippingInformation(userId: string, shipment: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  sendPasswordResetEmail(userId: string, resetToken: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
