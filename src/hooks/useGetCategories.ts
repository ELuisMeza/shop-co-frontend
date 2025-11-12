import { useEffect, useState } from "react";
import type { Category } from "../types/product.types";
import { ProductService } from "../services/product.service";
import toast from "react-hot-toast";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const { success, message, data } = await ProductService.getCategories();
      if (success && data) {
        setCategories(data);
      } else {
        toast.error(message);
        setCategories([]);
      }
      setLoading(false);
    }
    getCategories();
  },[])

  return {
    categories,
    loading,
  };
}