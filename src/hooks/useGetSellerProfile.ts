import { useEffect, useState } from "react";
import type { TypeSeller } from "../types/user.types";
import { SellerService } from "../services/seller.service";

export const useGetSellerProfile = () => {
  const [sellerProfile, setSellerProfile] = useState<TypeSeller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSellerProfile = async () => {
      const { success, message, data } = await SellerService.getMySellerProfile();
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

  return { sellerProfile, loading, error, setSellerProfile };
}