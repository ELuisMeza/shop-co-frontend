import { useState } from "react";
import { useEffect } from "react";
import type { TypeCartItem } from "../types/cart.types";
import { CartService } from "../services/cart.service";

export const useGetCartItems = () => {
  const [cartItems, setCartItems] = useState<TypeCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const { data, success, message } = await CartService.getCartItems();
      if (success && data) {
        setCartItems(data);
      } else {
        setError(message);
        setCartItems([]);
      }
      setLoading(false);
    };
    fetchCart();
  }, []);

  return { cartItems, loading, error, setCartItems };
}
