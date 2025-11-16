import type { TypeUser, UpdateUserProfile } from "../types/user.types";
import apiService from "./api.service";

const BASE_URL = '/users';

export const UsersService = {
  getMyProfile: async (): Promise<{ success: boolean; message: string; data: TypeUser | null }> => {
    try {
      const response = await apiService.get(`${BASE_URL}/my-profile`);
      return { success: true, message: 'Usuario cargado correctamente', data: response.data };
    } catch (error) {
      return { success: false, message: 'Error al cargar usuario', data: null };
    }
  },
  
  updateMyProfile: async (data: UpdateUserProfile): Promise<{ success: boolean; message: string; data: TypeUser | null }> => {
    try {
      const response = await apiService.put(`${BASE_URL}/my-profile`, data);
      return { success: true, message: 'Perfil actualizado correctamente', data: response.data };
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al actualizar el perfil';
      return { success: false, message, data: null };
    }
  },
};