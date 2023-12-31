import reducers from "../reducer";

export type RootState = ReturnType<typeof reducers>;

export interface iPosition {
  latitude: number;
  longitude: number;
}

export interface iCartItem {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface iMenuItem {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

export type iMenu = iMenuItem[];

export interface iCreateOrderRequest {
  customer: string;
  phone: string;
  priority: boolean;
  address: string;
  cart: iCartItem;
}

export interface iOrderResponse {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: iCartItem[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status: string;
  createdAt?: string;
}
