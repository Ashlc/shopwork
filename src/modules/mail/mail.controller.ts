import { Body, Controller, Post } from '@nestjs/common';
import type {
  OrderClosureDto,
  OrderEmailDto,
  PasswordResetEmailDto,
  SendBulkEmailDto,
  SendEmailDto,
  ShippingEmailDto,
} from 'src/interfaces/dtos/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() data: SendEmailDto) {
    return this.mailService.sendEmail(data.to, data.subject, data.body);
  }

  @Post('send-bulk')
  async sendBulkEmail(@Body() data: SendBulkEmailDto) {
    return this.mailService.sendBulkEmail(
      data.recipients,
      data.subject,
      data.body,
    );
  }

  @Post('order-confirmation')
  async sendOrderConfirmation(@Body() data: OrderEmailDto) {
    return this.mailService.sendOrderConfirmation(data.userId, data.orderId);
  }

  @Post('order-closure')
  async sendClosureConfirmation(@Body() data: OrderClosureDto) {
    return this.mailService.sendClosureConfirmation(data.userId, data.orderId);
  }

  @Post('shipping-information')
  async sendShippingInformation(@Body() data: ShippingEmailDto) {
    return this.mailService.sendShippingInformation(data.userId, data.shipment);
  }

  @Post('password-reset')
  async sendPasswordResetEmail(@Body() data: PasswordResetEmailDto) {
    return this.mailService.sendPasswordResetEmail(
      data.userId,
      data.resetToken,
    );
  }
}
