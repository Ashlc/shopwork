import { IAddress, IShipment } from 'src/interfaces/models';
import { IShippingService } from 'src/interfaces/services';

abstract class ShippingService implements IShippingService {
  abstract calculateShippingCost(userId: string, address: IAddress): number;
  abstract createShipment(
    orderId: string,
    shipmentData: Omit<IShipment, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<IShipment>;
  abstract getShipment(shipmentId: string): Promise<IShipment>;
  abstract updateShipment(
    shipmentId: string,
    shipmentData: Partial<IShipment>,
  ): Promise<IShipment>;
  abstract trackShipment(shipmentId: string): Promise<IShipment>;
}

export default ShippingService;
