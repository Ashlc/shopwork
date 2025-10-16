import { IShipment } from 'src/interfaces/models';

export interface SendEmailDto {
  to: string;
  subject: string;
  body: string;
}

export interface SendBulkEmailDto {
  recipients: string[];
  subject: string;
  body: string;
}

export interface OrderEmailDto {
  userId: string;
  orderId: string;
}

export interface ShippingEmailDto {
  userId: string;
  shipment: IShipment;
}

export interface PasswordResetEmailDto {
  userId: string;
  resetToken: string;
}

export interface OrderClosureDto {
  userId: string;
  orderId: string;
}

export interface PasswordResetEmailDto {
  userId: string;
  resetToken: string;
}
