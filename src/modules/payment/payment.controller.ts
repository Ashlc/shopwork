import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { IPayment } from 'src/interfaces/models';
import type { PaymentMethod } from 'src/types';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('orders/:orderId/process')
  async openPaymentProcess(
    @Param('orderId') orderId: string,
    @Body() data: { method: PaymentMethod },
  ) {
    return this.paymentService.openPaymentProcess(orderId, data.method);
  }

  @Post('process')
  async processPayment(@Body() paymentData: Omit<IPayment, 'id'>) {
    return this.paymentService.processPayment(paymentData);
  }

  @Post(':paymentId/refund')
  async refundPayment(@Param('paymentId') paymentId: string) {
    return this.paymentService.refundPayment(paymentId);
  }

  @Get(':paymentId')
  async getPaymentDetails(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentDetails(paymentId);
  }
}
