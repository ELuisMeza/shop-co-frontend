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

export interface TypeMyOrders {
  order_id: string;
  paypal_id: string;
  payment_id: string;
  total_amount: string;
  paid_at: string;
  created_at: string;
}
export interface TypeMyOrdersSeller extends TypeMyOrders {
  items: TypeMyOrderItemSeller[];
}

export interface TypeMyOrdersBuyer extends TypeMyOrders {
  items: TypeMyOrderItemBuyer[];
}

export interface TypeMyOrderItem {
  order_item_id: string;
  product_name: string;
  quantity: number;
  unit_price: string;
  total_price: string;
}
export interface TypeMyOrderItemBuyer extends TypeMyOrderItem {
  seller_name: string;
}

export interface TypeMyOrderItemSeller extends TypeMyOrderItem {
  buyer_name: string;
}
