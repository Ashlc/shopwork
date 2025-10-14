import { Module } from '@nestjs/common';
import { IMailService } from 'src/interfaces/services';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule implements IMailService {
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
