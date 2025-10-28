import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentMethod } from 'src/types';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('open')
  async openPaymentProcess(@Body() body: { orderId: string; method: PaymentMethod }) {
    const paymentUrl = await this.paymentService.openPaymentProcess(body.orderId, body.method);
    return { paymentUrl };
  }

  @Post('process')
  async processPayment(@Body() paymentData: any) {
    return this.paymentService.processPayment(paymentData);
  }

  @Get(':id')
  async getPaymentDetails(@Param('id') id: string) {
    return this.paymentService.getPaymentDetails(id);
  }

  @Post(':id/refund')
  async refundPayment(@Param('id') id: string) {
    return this.paymentService.refundPayment(id);
  }

  @Post('callback/:id')
  async simulatePaymentCallback(@Param('id') id: string) {
    const result = await this.paymentService.simulatePaymentCallback(id, true);
    return result;
  }
}
