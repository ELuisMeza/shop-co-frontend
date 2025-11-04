import { AxiosError } from "axios";
import type { LoginResponse } from "../types/responses.types";
import apiService from "./api.service";
import type { CreateUser } from "../types/user.types";
import type { CreateSeller } from "../types/user.types";

const BASE_URL = '/auth'

export const LoginService = {

    login: async (email: string, password: string): Promise<{ success: boolean; message: string; data: LoginResponse | null }> => {
      try {
        const response = await apiService.post(`${BASE_URL}/login`, { email, password });
        return { success: true, message: 'Inicio de sesión exitoso', data: response.data };
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            return { success: false, message: 'Credenciales incorrectas', data: null };
          }
        }
        return { success: false, message: 'Error al iniciar sesión', data: null };
      }
    },
  
    register: async (data: CreateUser): Promise<{ success: boolean, message: string, data: LoginResponse | null }> => {
      try {
        const response = await apiService.post(`${BASE_URL}/register-user`, data);
        return { success: true, message: 'Usuario registrado correctamente', data: response.data };
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            return { success: false, message: error.response?.data?.message || 'Error al registrar usuario', data: null };
          }
        }
        return { success: false, message: 'Error al registrar usuario', data: null };
      }
    },

    registerSeller: async (data: CreateSeller): Promise<{ success: boolean; message: string; data: LoginResponse | null }> => {
      try {
        const formData = new FormData();
    
        // Convertimos todos los campos del objeto a FormData
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            // Si es un File, lo agregamos directamente
            if (value instanceof File) {
              formData.append(key, value);
            } else {
              // Para otros tipos, convertimos a string
              formData.append(key, String(value));
            }
          }
        });
    
        const response = await apiService.post(`${BASE_URL}/register-seller`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
    
        return { success: true, message: "Vendedor registrado correctamente", data: response.data };
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            return { success: false, message: error.response?.data?.message || "Error al registrar vendedor", data: null };
          }
        }
        return { success: false, message: "Error al registrar vendedor", data: null };
      }
    },
    
}