import { useEffect, useState } from "react";
import type { TypeSeller } from "../types/user.types";
import { SellerService } from "../services/seller.service";
import type { TypeProduct } from "../types/product.types";
import { ProductService } from "../services/product.service";

export const useGetSellerProfile = () => {
  const [sellerProfile, setSellerProfile] = useState<TypeSeller | null>(null);
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSellerProfile = async () => {
      const { success, message, data } = await SellerService.getMySellerProfile();
      const { success: successProducts, message: messageProducts, data: dataProducts } = await ProductService.getMyProducts();

      if (successProducts && dataProducts) {
        setProducts(dataProducts.products);
      } else {
        setErrorProducts(messageProducts);
        setProducts([]);
      }
      setLoadingProducts(false);
      if (success && data) {
        setSellerProfile(data);
        } else {
        setError(message);
        setSellerProfile(null);
      }
      setLoading(false);
    };
    getSellerProfile();
  }, []);

  return { sellerProfile, products, loading, error, setSellerProfile, setProducts, loadingProducts, errorProducts };
}