import type { ShipmentStatus } from 'src/types';
import type { IShipment } from '../models';

export interface CreateShipmentDto {
  orderId: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  method: 'standard' | 'express' | 'overnight';
  trackingNumber?: string;
}

export interface UpdateShipmentDto {
  status?: ShipmentStatus;
  trackingNumber?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  carrierNotes?: string;
}

export interface ShipmentResponseDto extends IShipment {
  order?: {
    id: string;
    totalAmount: number;
  };
  timeline?: {
    status: ShipmentStatus;
    timestamp: Date;
    location?: string;
    notes?: string;
  }[];
}
