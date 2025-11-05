import apiService from './api.service';
import type { Product, ProductsResponse, CategoriesResponse } from '../types/product.types';

export interface GetProductsParams {
  category_ids?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

/**
 * Busca productos con paginación, filtros por nombre y categorías
 */
export const getProducts = async (params?: GetProductsParams): Promise<ProductsResponse> => {
  const response = await apiService.post<ProductsResponse>('/products/search', {
    page: params?.page || 1,
    limit: params?.limit || 10,
    ...(params?.search && { search: params.search }),
    ...(params?.category_ids && params.category_ids.length > 0 && { category_ids: params.category_ids }),
  });
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
  const response = await apiService.get<CategoriesResponse>('/categories/all');
  return response.data;
};

/**
 * Obtiene productos por categoría
 */
export const getProductsByCategory = async (categoryId: string): Promise<ProductsResponse> => {
  const response = await apiService.post<ProductsResponse>('/products/search', {
    page: 1,
    limit: 10,
    category_ids: [categoryId],
  });
  return response.data;
};

