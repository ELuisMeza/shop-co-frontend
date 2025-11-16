import { useEffect, useState } from "react";
import type { TypeProduct, GetProductsParams } from "../types/product.types";
import { ProductService } from "../services/product.service";
import toast from "react-hot-toast";

export const useGetMyProducts = (params: GetProductsParams) => {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>({
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 0,
  });

  useEffect(() => {
    const getMyProducts = async () => {
      setLoading(true);

      const { page, limit, search, category_ids, min_price, max_price, status } = params;

      const filteredParams: GetProductsParams = {
        page,
        limit,
      };

      if (search && search.trim() !== "") {
        filteredParams.search = search;
      }

      if (category_ids && category_ids.length > 0) {
        filteredParams.category_ids = category_ids;
      }

      if (typeof min_price === "number" && min_price !== 0) {
        filteredParams.min_price = min_price;
      }

      if (typeof max_price === "number" && max_price !== 0) {
        filteredParams.max_price = max_price;
      }

      if (status) {
        filteredParams.status = status;
      }

      const { success, message, data } = await ProductService.getMyProducts(filteredParams);

      if (success && data) {
        setProducts(data.products || []);
        // Usar meta si está disponible, sino calcular totalPages
        const total = data.meta?.total ?? data.total ?? 0;
        const limit = data.meta?.limit ?? data.limit ?? 9;
        const page = data.meta?.page ?? data.page ?? 1;
        
        // Calcular totalPages: usar meta.totalPages si existe, sino calcularlo
        let totalPages = data.meta?.totalPages;
        if (!totalPages || isNaN(totalPages)) {
          totalPages = limit > 0 ? Math.ceil(total / limit) : 0;
        }
        
        // Asegurar que totalPages sea un número válido
        totalPages = Math.max(0, Math.floor(totalPages || 0));
        
        setPagination({
          total: total,
          page: page,
          limit: limit,
          totalPages: totalPages,
        });
      } else {
        setError(message);
        toast.error(message);
        setProducts([]);
        setPagination({
          total: 0,
          page: 1,
          limit: params.limit || 9,
          totalPages: 0,
        });
      }
      setLoading(false);
    };
    getMyProducts();
  }, [params]);
  
  return {
    products,
    loading,
    error,
    pagination,
  };
};

