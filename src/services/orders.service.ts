import type { TypeCreateOrder, TypeCreateOrderResponse, TypeMyOrdersBuyer, TypeMyOrdersSeller } from "../types/orders.types";
import { AxiosError } from "axios";
import apiService from "./api.service";

const BASE_URL = '/orders';

export const OrdersService = {
  createOrder: async (orderData: TypeCreateOrder): Promise<{ success: boolean; message: string; data: TypeCreateOrderResponse | null }> => {
    try {
      const response = await apiService.post(`${BASE_URL}`, orderData);
      return { success: true, message: 'Orden creada correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al crear orden', data: null };
    }
  },

  confirmPayment: async (token: string): Promise<{ success: boolean; message: string; data: string | null }> => {
    try {
      const response = await apiService.post(`${BASE_URL}/capture/${token}`);
      return { success: true, message: 'Pago confirmado correctamente', data: response.data };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        return { success: false, message: error.response.data.message, data: null };
      }
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return { success: false, message: 'Error al confirmar pago: ' + errorMessage, data: null };
    }
  },

  getMyOrders: async (): Promise<{ success: boolean; message: string; data: TypeMyOrdersBuyer[] | null }> => {
    try {
      const response = await apiService.get<TypeMyOrdersBuyer[]>(`${BASE_URL}/buyer/my-orders`);
      return { success: true, message: 'Pedidos cargados correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al cargar pedidos', data: [] };
    }
  },

  getMyOrdersSeller: async (): Promise<{ success: boolean; message: string; data: TypeMyOrdersSeller[] | null }> => {
    try {
      const response = await apiService.get<TypeMyOrdersSeller[]>(`${BASE_URL}/seller/my-orders`);
      return { success: true, message: 'Pedidos cargados correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al cargar pedidos', data: [] };
    }
  }
}