import { useEffect, useState } from "react";
import { OrdersService } from "../services/orders.service";
import type { TypeMyOrdersBuyer, TypeMyOrdersSeller } from "../types/orders.types";

interface Params {
  userType: 'buyer' | 'seller';
}

export const useGetMyOrdersBuyer = ({ userType }: Params) => {
  const [orders, setOrders] = useState<TypeMyOrdersBuyer[] | TypeMyOrdersSeller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMyOrders = async () => {
    const { success, message, data } = await OrdersService.getMyOrders();
    if (success && data) {
      setOrders(data);
    } else {
      setError(message);
      setOrders([]);
    }
    setLoading(false);
  };
  
  const getMyOrdersSeller = async () => {
    const { success, message, data } = await OrdersService.getMyOrdersSeller();
    if (success && data) {
      setOrders(data);
    } else {
      setError(message);
      setOrders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userType === 'buyer') {
      getMyOrders();
    } else {
      getMyOrdersSeller();
    }
  }, []);

  return { orders, loading, error, setOrders };
}