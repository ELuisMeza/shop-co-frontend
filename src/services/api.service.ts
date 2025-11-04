import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStore } from '../stores/user.store';

const baseURL = import.meta.env.VITE_API_URL_BACK ;

const apiService: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useUserStore.getState().token;
    const isAuthRequest = config.url?.includes('/auth/login') || 
                         config.url?.includes('/auth/register-user') || 
                         config.url?.includes('/auth/register-seller');
    
    // Solo agregar token si existe y no es una petición de autenticación
    if (token && config.headers && !isAuthRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
apiService.interceptors.request.use((config) => {
  // Si el body es FormData, eliminamos el Content-Type para que Axios lo ponga automáticamente
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
      // El PrivateRoute se encargará de redirigir a /login si es necesario
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default apiService; 