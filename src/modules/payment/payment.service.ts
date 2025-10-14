import { Injectable } from '@nestjs/common';
import { IPayment } from 'src/interfaces/models';
import { IPaymentService } from 'src/interfaces/services';
import { PaymentMethod } from 'src/types';

@Injectable()
export class PaymentService implements IPaymentService {
  private payments: Map<string, IPayment> = new Map();

  async openPaymentProcess(orderId: string, method: PaymentMethod): Promise<string> {
    // Simular abertura de processo de pagamento
    const paymentId = `pay_${Date.now()}`;
    
    console.log(`💳 Processo de pagamento aberto para pedido ${orderId} via ${method}`);
    
    // Simular diferentes URLs de pagamento baseado no método
    let paymentUrl = '';
    switch (method) {
      case 'credit_card':
        paymentUrl = `https://payment.example.com/credit/${paymentId}`;
        break;
      case 'pix':
        paymentUrl = `https://payment.example.com/pix/${paymentId}`;
        break;
      case 'boleto':
        paymentUrl = `https://payment.example.com/boleto/${paymentId}`;
        break;
      default:
        paymentUrl = `https://payment.example.com/generic/${paymentId}`;
    }

    console.log('✅ URL de pagamento gerada:', paymentUrl);
    return paymentUrl;
  }

  async processPayment(paymentData: Omit<IPayment, 'id'>): Promise<IPayment> {
    if (paymentData.amount <= 0) {
      throw new Error('Valor do pagamento deve ser maior que zero');
    }

    // Simular processamento de pagamento
    const payment: IPayment = {
      id: `pay_${Date.now()}`,
      ...paymentData,
    };

    // Simular diferentes taxas de sucesso baseado no método
    const successRate = this.getSuccessRateByMethod(paymentData.paymentMethod);
    const isSuccessful = Math.random() < successRate;

    if (isSuccessful) {
      payment.status = 'completed';
      console.log('✅ Pagamento processado com sucesso:', payment.id);
    } else {
      payment.status = 'failed';
      console.log('❌ Falha no processamento do pagamento:', payment.id);
    }

    this.payments.set(payment.id, payment);
    return payment;
  }

  async refundPayment(paymentId: string): Promise<any> {
    const payment = this.payments.get(paymentId);
    
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    if (payment.status !== 'completed') {
      throw new Error('Apenas pagamentos completados podem ser reembolsados');
    }

    // Simular reembolso
    const refund = {
      id: `refund_${Date.now()}`,
      paymentId,
      amount: payment.amount,
      status: 'processed',
      processedAt: new Date().toISOString(),
    };

    payment.status = 'refunded';
    this.payments.set(paymentId, payment);

    console.log('✅ Reembolso processado:', refund.id, 'Valor:', refund.amount);
    return refund;
  }

  async getPaymentDetails(paymentId: string): Promise<IPayment> {
    const payment = this.payments.get(paymentId);
    
    if (!payment) {
      throw new Error('Pagamento não encontrado');
    }

    console.log('✅ Detalhes do pagamento recuperados:', paymentId);
    return payment;
  }

  private getSuccessRateByMethod(method: PaymentMethod): number {
    // Simular diferentes taxas de sucesso por método de pagamento
    switch (method) {
      case 'credit_card':
        return 0.95; // 95% de sucesso
      case 'pix':
        return 0.98; // 98% de sucesso
      case 'boleto':
        return 0.85; // 85% de sucesso
      default:
        return 0.80; // 80% de sucesso
    }
  }
}
