import { Injectable } from '@nestjs/common';
import { IAddress, IShipment } from 'src/interfaces/models';
import { IShippingService } from 'src/interfaces/services';

@Injectable()
export class ShippingService implements IShippingService {
  private shipments: Map<string, IShipment> = new Map();

  calculateShippingCost(userId: string, address: IAddress): number {
    // Simular cálculo de frete baseado no estado e CEP
    let baseCost = 15.99; // Custo base

    // Ajustar custo baseado no estado
    switch (address.state) {
      case 'SP':
        baseCost = 12.99; // São Paulo - mais barato
        break;
      case 'RJ':
        baseCost = 14.99; // Rio de Janeiro
        break;
      case 'MG':
        baseCost = 16.99; // Minas Gerais
        break;
      case 'RS':
      case 'SC':
      case 'PR':
        baseCost = 18.99; // Sul - mais caro
        break;
      case 'AM':
      case 'AC':
      case 'RO':
      case 'RR':
      case 'AP':
        baseCost = 25.99; // Norte - mais caro
        break;
      default:
        baseCost = 19.99; // Outros estados
    }

    // Ajustar baseado no CEP (simulação)
    const zipCode = address.zipCode.replace(/\D/g, '');
    if (zipCode.startsWith('01') || zipCode.startsWith('02')) {
      baseCost += 5.00; // Zona central - mais caro
    }

    console.log(`🚚 Custo de frete calculado para ${address.city}/${address.state}: R$ ${baseCost.toFixed(2)}`);
    return baseCost;
  }

  async createShipment(
    orderId: string,
    shipmentData: Omit<IShipment, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
  ): Promise<IShipment> {
    const shipment: IShipment = {
      id: `ship_${Date.now()}`,
      ...shipmentData,
      status: 'pending',
      trackingNumber: this.generateTrackingCode(),
      carrier: this.selectCarrier(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.shipments.set(shipment.id, shipment);
    console.log('✅ Envio criado:', shipment.id, 'para pedido:', orderId);
    return shipment;
  }

  async getShipment(shipmentId: string): Promise<IShipment> {
    const shipment = this.shipments.get(shipmentId);
    
    if (!shipment) {
      throw new Error('Envio não encontrado');
    }

    console.log('✅ Envio encontrado:', shipmentId);
    return shipment;
  }

  async updateShipment(
    shipmentId: string,
    shipmentData: Partial<IShipment>,
  ): Promise<IShipment> {
    const shipment = this.shipments.get(shipmentId);
    
    if (!shipment) {
      throw new Error('Envio não encontrado');
    }

    const updatedShipment = {
      ...shipment,
      ...shipmentData,
      updatedAt: new Date().toISOString(),
    };

    this.shipments.set(shipmentId, updatedShipment);
    console.log('✅ Envio atualizado:', shipmentId);
    return updatedShipment;
  }

  async trackShipment(shipmentId: string): Promise<IShipment> {
    const shipment = this.shipments.get(shipmentId);
    
    if (!shipment) {
      throw new Error('Envio não encontrado');
    }

    // Simular atualização de status baseado no tempo
    const now = new Date();
    const createdAt = new Date(shipment.createdAt);
    const hoursSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    let newStatus = shipment.status;
    if (hoursSinceCreation > 24 && shipment.status === 'pending') {
      newStatus = 'in_transit';
    } else if (hoursSinceCreation > 120 && shipment.status === 'in_transit') {
      newStatus = 'delivered';
    }

    if (newStatus !== shipment.status) {
      shipment.status = newStatus;
      shipment.updatedAt = new Date().toISOString();
      this.shipments.set(shipmentId, shipment);
      console.log(`📦 Status do envio atualizado para: ${newStatus}`);
    }

    console.log('✅ Rastreamento do envio:', shipmentId, 'Status:', shipment.status);
    return shipment;
  }

  private generateTrackingCode(): string {
    // Gerar código de rastreamento no formato BR123456789
    const prefix = 'BR';
    const number = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    return `${prefix}${number}`;
  }

  private selectCarrier(): string {
    // Simular seleção de transportadora
    const carriers = ['Correios', 'Total Express', 'Jadlog', 'Loggi'];
    return carriers[Math.floor(Math.random() * carriers.length)];
  }

  private generateTrackingUrl(): string {
    return `https://rastreamento.exemplo.com/track/${this.generateTrackingCode()}`;
  }
}
