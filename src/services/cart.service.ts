import type { TypeCartItem } from "../types/cart.types";
import apiService from "./api.service";

const BASE_URL = '/cart-items'

export const CartService = {
  getCartItems: async (): Promise<{ success: boolean; message: string; data: TypeCartItem[] | null }> => {
    try {
      const response = await apiService.get(`${BASE_URL}/my-cart`);
      return { success: true, message: 'Carrito de compras cargado correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al cargar carrito de compras', data: null };
    }
  },

  addCartItem: async (productId: string, quantity: number): Promise<{ success: boolean; message: string; data: TypeCartItem | null }> => {
    try {
      const response = await apiService.post<TypeCartItem>(`${BASE_URL}`, { product_id: productId, quantity: quantity });
      return { success: true, message: 'Item agregado al carrito de compras correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al agregar item al carrito de compras', data: null };
    }
  },

  updateCartItem: async (cartItemId: string, quantity: number): Promise<{ success: boolean; message: string; data: string | null }> => {
    try {
      const response = await apiService.put(`${BASE_URL}/${cartItemId}`, { quantity: quantity });
      return { success: true, message: 'Item actualizado en el carrito de compras correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al actualizar item en el carrito de compras', data: null };
    }
  },

  deleteCartItem: async (productId: string): Promise<{ success: boolean; message: string; data: string | null }> => {
    try {
      const response = await apiService.delete<string>(`${BASE_URL}/${productId}`);
      return { success: true, message: 'Item eliminado del carrito de compras correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al eliminar item del carrito de compras', data: null };
    }
  },

  clearCart: async (): Promise<{ success: boolean; message: string; data: string | null }> => {
    try {
      const response = await apiService.delete(`${BASE_URL}/clear-cart`);
      return { success: true, message: 'Carrito de compras vaciado correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al vaciar carrito de compras', data: null };
    }
  },
    
}