import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; body: string }) {
    return this.mailService.sendEmail(body.to, body.subject, body.body);
  }

  @Post('order-confirmation')
  async sendOrderConfirmation(@Body() body: { userId: string; orderId: string }) {
    return this.mailService.sendOrderConfirmation(body.userId, body.orderId);
  }

  @Post('shipping-info')
  async sendShippingInformation(@Body() body: { userId: string; shipment: any }) {
    return this.mailService.sendShippingInformation(body.userId, body.shipment);
  }

  @Post('password-reset')
  async sendPasswordResetEmail(@Body() body: { userId: string; resetToken: string }) {
    return this.mailService.sendPasswordResetEmail(body.userId, body.resetToken);
  }
}
