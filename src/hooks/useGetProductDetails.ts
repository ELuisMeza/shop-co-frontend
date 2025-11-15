import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import { ProductService } from "../services/product.service";

export const useGetProductDetails = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      const { success, message, data } = await ProductService.getProductById(id);
      if (success && data) {
        setProduct(data);
      } else {
        setError(message);
        setProduct(null);
      }
      setLoading(false);
    }
    getProductDetails();
  }, [id]);

  return { product, loading, error };
}