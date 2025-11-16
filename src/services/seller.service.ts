import apiService from "./api.service";
import type { TypeSeller, UpdateSellerProfile } from "../types/user.types";

const BASE_URL = '/sellers';

export const SellerService = {
  getMySellerProfile: async (): Promise<{ success: boolean; message: string; data: TypeSeller | null }> => {
    try {
      const response = await apiService.get(`${BASE_URL}/my-profile`);
      return { success: true, message: 'Perfil de vendedor cargado correctamente', data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al cargar el perfil de vendedor';
      return { success: false, message, data: null };
    }
  },

  updateMySellerProfile: async (data: UpdateSellerProfile): Promise<{ success: boolean; message: string; data: TypeSeller | null }> => {
    try {
      const formData = new FormData();
      formData.append("shop_name", data.shop_name);
      formData.append("business_address", data.business_address);
      
      if (data.description !== undefined) {
        formData.append("description", data.description || "");
      }
      
      if (data.logo_image instanceof File) {
        formData.append("logo_image", data.logo_image);
      }

      const response = await apiService.put(`${BASE_URL}/my-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, message: 'Perfil de vendedor actualizado correctamente', data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al actualizar el perfil de vendedor';
      return { success: false, message, data: null };
    }
  },
}