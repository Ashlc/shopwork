import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceDiscoveryService {
  private services = {
    user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    product: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002',
    catalog: process.env.CATALOG_SERVICE_URL || 'http://localhost:3003',
    cart: process.env.CART_SERVICE_URL || 'http://localhost:3004',
    order: process.env.ORDER_SERVICE_URL || 'http://localhost:3005',
    payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3006',
    shipping: process.env.SHIPPING_SERVICE_URL || 'http://localhost:3007',
    mail: process.env.MAIL_SERVICE_URL || 'http://localhost:3008',
    review: process.env.REVIEW_SERVICE_URL || 'http://localhost:3009',
  };

  getServiceUrl(serviceName: string): string {
    const url = this.services[serviceName];
    if (!url) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return url;
  }

  getAllServices() {
    return this.services;
  }
}
