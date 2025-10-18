import { Injectable } from '@nestjs/common';
import BaseShippingService from 'src/framework/abstract/shipping.abstract';
import { IAddress, IShipment } from 'src/interfaces/models';

@Injectable()
export class ShippingService extends BaseShippingService {
  calculateShippingCost(userId: string, address: IAddress): number {
    throw new Error('Method not implemented.');
  }
  createShipment(
    orderId: string,
    shipmentData: Omit<IShipment, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<IShipment> {
    throw new Error('Method not implemented.');
  }
  getShipment(shipmentId: string): Promise<IShipment> {
    throw new Error('Method not implemented.');
  }
  updateShipment(
    shipmentId: string,
    shipmentData: Partial<IShipment>,
  ): Promise<IShipment> {
    throw new Error('Method not implemented.');
  }
  trackShipment(shipmentId: string): Promise<IShipment> {
    throw new Error('Method not implemented.');
  }
}
