export interface TypeCreateOrder {
  currency: string;
  items: TypeOrderItem[];
}

export interface TypeOrderItem {
  quantity: number;
  unit_price: number;
  product_id: string;
}

export interface TypeCreateOrderResponse {
  link: string;
  orderId: string;
}