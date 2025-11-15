import { useEffect, useState } from "react";
import { CartService } from "../services/cart.service";
import type { TypeCartItem } from "../types/cart.types";
import toast from "react-hot-toast";

export const CartPage = () => {
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

  const handleDeleteCartItem = async (productId: string) => {
    const { success, message, data } = await CartService.deleteCartItem(
      productId
    );
    if (success && data) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted">Cargando carrito de compras...</p>
          </div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      ) : (
        <div>
          <h1>Cart Page</h1>
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cartItems.map((item, index) => (
                <div key={index}>
                  <h2>{item.product_name}</h2>
                  <p>{item.product_price}</p>
                  <p>{item.product_stock}</p>
                  <p>{item.file_path}</p>
                  <p>{item.quantity}</p>
                  <button
                    className="bg-primary text-background px-4 py-2 rounded-md"
                    onClick={() => handleDeleteCartItem(item.product_id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted mb-2">
                No hay items en el carrito
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
