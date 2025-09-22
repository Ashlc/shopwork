import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Role,
  ShipmentStatus,
} from 'src/types';

export interface ITimestamps {
  createdAt: string;
  updatedAt?: string;
}

export interface IAddress extends ITimestamps {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IUser extends ITimestamps {
  id: string;
  name: string;
  email: string;
  dob: string;
  pfp: string;
  identificationNumber: string;
  phoneNumber: string;
  role: Role;
  address: IAddress;
}

export interface IProduct extends ITimestamps {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantityInStock: number;
  imageUrl?: string;
}

export interface IRecommendation {
  idUser: string;
  product: IProduct;
}

export interface IOrder extends ITimestamps {
  id: string;
  userId: string;
  products: IProduct[];
  productTotal: number;
  shippingCost?: number;
  taxes?: number;
  totalAmount: number;
  status: OrderStatus;
  orderDate?: string;
  shipmentId?: string;
  paymentId?: string;
}

export interface IReview extends ITimestamps {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

export interface ICategory extends ITimestamps {
  id: string;
  name: string;
  description?: string;
}

export interface IPayment extends ITimestamps {
  id: string;
  orderId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
}

export interface IShipment extends ITimestamps {
  id: string;
  orderId: string;
  shipmentDate: string;
  deliveryDate?: string;
  carrier: string;
  trackingNumber: string;
  status: ShipmentStatus;
}

export interface ICartItem extends ITimestamps {
  id: string;
  productId: string;
  product: IProduct;
  quantity: number;
}

export interface ICart extends ITimestamps {
  id: string;
  userId: string;
  products: ICartItem[];
}
