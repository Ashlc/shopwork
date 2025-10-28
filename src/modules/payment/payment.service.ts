import { Injectable } from '@nestjs/common';
import { IPayment } from 'src/interfaces/models';
import { IPaymentService } from 'src/interfaces/services';
import { PaymentMethod } from 'src/types';

@Injectable()
export class PaymentService implements IPaymentService {
  private payments: Map<string, IPayment> = new Map();

  private paymentsMap: Map<string, { orderId: string; method: PaymentMethod }> = new Map();

  async openPaymentProcess(orderId: string, method: PaymentMethod): Promise<string> {
    // Simular abertura de processo de pagamento
    const paymentId = `pay_${Date.now()}`;
    
    console.log(`💳 Processo de pagamento aberto para pedido ${orderId} via ${method}`);
    
    // Salvar associação paymentId -> orderId
    this.paymentsMap.set(paymentId, { orderId, method });
    
    // Simular diferentes URLs de pagamento baseado no método
    // A URL será um endpoint local que simula o gateway de pagamento
    const baseUrl = 'http://localhost:3000/api';
    let paymentUrl = '';
    switch (method) {
      case 'credit_card':
        paymentUrl = `${baseUrl}/payments/callback/${paymentId}?method=credit_card`;
        break;
      case 'pix':
        paymentUrl = `${baseUrl}/payments/callback/${paymentId}?method=pix`;
        break;
      case 'boleto':
        paymentUrl = `${baseUrl}/payments/callback/${paymentId}?method=boleto`;
        break;
      default:
        paymentUrl = `${baseUrl}/payments/callback/${paymentId}?method=generic`;
    }

    console.log('✅ URL de pagamento gerada:', paymentUrl);
    return paymentUrl;
  }

  async simulatePaymentCallback(paymentId: string, success: boolean = true): Promise<{ paymentId: string; orderId: string; status: string }> {
    const paymentInfo = this.paymentsMap.get(paymentId);
    
    if (!paymentInfo) {
      throw new Error('Pagamento não encontrado');
    }

    // Criar registro de pagamento
    const payment: IPayment = {
      id: paymentId,
      orderId: paymentInfo.orderId,
      amount: 0, // Será atualizado quando o pedido for recuperado
      userId: '', // Será atualizado quando o pedido for recuperado
      paymentDate: new Date().toISOString(),
      paymentMethod: paymentInfo.method,
      status: success ? 'completed' : 'failed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.payments.set(paymentId, payment);
    
    console.log(success 
      ? `✅ Pagamento processado com sucesso: ${paymentId}` 
      : `❌ Falha no processamento do pagamento: ${paymentId}`
    );

    return {
      paymentId,
      orderId: paymentInfo.orderId,
      status: payment.status
    };
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
