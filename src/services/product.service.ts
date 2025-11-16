import apiService from "./api.service";
import type {
  ProductsResponse,
  GetProductsParams,
  TypeCategory,
  TypeProductDetails,
} from "../types/product.types";

const BASE_URL = "/products";

export const ProductService = {
  getProducts: async (
    params?: GetProductsParams
  ): Promise<{
    success: boolean;
    message: string;
    data: ProductsResponse | null;
  }> => {
    try {
      const response = await apiService.post<ProductsResponse>(
        `${BASE_URL}/search`,
        {
          page: params?.page || 1,
          limit: params?.limit || 10,
          ...(params?.search && { search: params.search }),
          ...(params?.category_ids &&
            params.category_ids.length > 0 && {
              category_ids: params.category_ids,
            }),
          ...(params?.min_price && { min_price: params.min_price }),
          ...(params?.max_price && { max_price: params.max_price }),
        }
      );
      return {
        success: true,
        message: "Productos cargados correctamente",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al cargar productos",
        data: null,
      };
    }
  },

  getProductById: async (
    id: string
  ): Promise<{ success: boolean; message: string; data: TypeProductDetails | null }> => {
    try {
      const response = await apiService.get<TypeProductDetails>(`${BASE_URL}/${id}`);
      return {
        success: true,
        message: "Producto cargado correctamente",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al cargar producto",
        data: null,
      };
    }
  },

  getCategories: async (): Promise<{
    success: boolean;
    message: string;
    data: TypeCategory[] | null;
  }> => {
    try {
      const response = await apiService.get<TypeCategory[]>(
        `/categories/all`
      );
      return {
        success: true,
        message: "Categorías cargadas correctamente",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al cargar categorías",
        data: null,
      };
    }
  },

  createProduct: async (formData: FormData): Promise<{
    success: boolean;
    message: string;
    data: TypeProductDetails | null;
  }> => {
    try {
      const response = await apiService.post<TypeProductDetails>(
        `${BASE_URL}`,
        formData
      );
      return {
        success: true,
        message: "Producto creado correctamente",
        data: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Error al crear producto";
      return {
        success: false,
        message,
        data: null,
      };
    }
  },

  getMyProducts: async (params?: GetProductsParams): Promise<{
    success: boolean;
    message: string;
    data: ProductsResponse | null;
  }> => {
    try {
      const response = await apiService.post<ProductsResponse>(`${BASE_URL}/my-products`, {
        page: params?.page || 1,
        limit: params?.limit || 9,
        ...(params?.search && { search: params.search }),
        ...(params?.category_ids &&
          params.category_ids.length > 0 && {
            category_ids: params.category_ids,
          }),
        ...(params?.min_price && { min_price: params.min_price }),
        ...(params?.max_price && { max_price: params.max_price }),
        ...(params?.status && { status: params.status }),
      });
      return {
        success: true,
        message: "Productos cargados correctamente",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al cargar productos",
        data: null,
      };
    }
  },

  updateProduct: async (id: string, formData: FormData): Promise<{
    success: boolean;
    message: string;
    data: TypeProductDetails | null;
  }> => {
    try {
      const response = await apiService.put<TypeProductDetails>(
        `${BASE_URL}/${id}`,
        formData
      );
      return {
        success: true,
        message: "Producto actualizado correctamente",
        data: response.data,
      };
    } catch (error: any) {
      const message = error.response?.data?.message || "Error al actualizar producto";
      return {
        success: false,
        message,
        data: null,
      };
    }
  },

  updateProductStatus: async (id: string): Promise<{
    success: boolean;
    message: string;
    data: TypeProductDetails | null;
  }> => {
    try {
      const response = await apiService.patch<TypeProductDetails>(`${BASE_URL}/${id}/status`);
      return {
        success: true,
        message: "Estado del producto actualizado correctamente",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error al actualizar estado del producto",
        data: null,
      };
    }
  },
};
