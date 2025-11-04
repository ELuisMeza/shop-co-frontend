import apiService from './api.service';
import type { Product, ProductsResponse, Category, CategoriesResponse } from '../types/product.types';

export interface GetProductsParams {
  category_id?: string;
  search?: string;
  page?: number;
  limit?: number;
  status?: string;
}

/**
 * Obtiene todos los productos con filtros opcionales
 */
export const getProducts = async (params?: GetProductsParams): Promise<ProductsResponse> => {
  const response = await apiService.get<ProductsResponse>('/products', { params });
  return response.data;
};

/**
 * Obtiene un producto por ID
 */
export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiService.get<Product>(`/products/${id}`);
  return response.data;
};

/**
 * Obtiene todas las categorías
 */
export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await apiService.get<CategoriesResponse>('/categories');
  return response.data;
};

/**
 * Obtiene productos por categoría
 */
export const getProductsByCategory = async (categoryId: string): Promise<ProductsResponse> => {
  const response = await apiService.get<ProductsResponse>('/products', {
    params: { category_id: categoryId },
  });
  return response.data;
};

