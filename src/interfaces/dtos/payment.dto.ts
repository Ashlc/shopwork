import type { PaymentMethod, PaymentStatus } from 'src/types';

export interface CreatePaymentDto {
  orderId: string;
  method: PaymentMethod;
  amount: number;
}

export interface ProcessPaymentDto {
  paymentId: string;
  token: string;
}

export interface PaymentResponseDto {
  id: string;
  orderId: string;
  userId: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
  processedAt?: Date;
}

export interface RefundPaymentDto {
  reason?: string;
  amount?: number;
}
