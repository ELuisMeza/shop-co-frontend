import { useState } from "react";
import type { TypeProductDetails } from "../../types/product.types";
import { CartService } from "../../services/cart.service";
import toast from "react-hot-toast";
import { useUserStore } from "../../stores/user.store";
import { isUserType } from "../../utils/isUserType";
import { formatPrice } from "../../utils/formatPrice";

interface ProductDetailsInfoProps {
  product: TypeProductDetails;
}

export const ProductDetailsInfo = ({ product }: ProductDetailsInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { user } = useUserStore();
  const isBuyer = isUserType('buyer');

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!isBuyer) {
      toast.error("Solo los compradores pueden agregar productos al carrito");
      return;
    }

    setIsAddingToCart(true);
    try {
      const { success, message, data } = await CartService.addCartItem(
        product.id,
        quantity
      );
      if (success && data) {
        toast.success(message);
        setQuantity(1); // Reset quantity after successful add
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Error al agregar al carrito");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header con información del vendedor */}
      {product.seller && (
        <div className="mb-4">
          <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
            {product.seller.shop_name}
          </p>
        </div>
      )}

      {/* Nombre del producto */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-6">
        {product.name}
      </h1>

      {/* Precio destacado */}
      <div className="mb-6">
        <span className="text-4xl md:text-5xl font-bold text-neutral-900">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Descripción */}
      {product.description && (
        <div className="mb-6">
          <p className="text-base text-neutral-600 leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      {/* Stock disponible */}
      <div className="mb-8 pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-neutral-700">
            Disponibilidad:
          </span>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock > 0 ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm font-semibold ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} ${product.stock === 1 ? 'unidad' : 'unidades'} en stock`
                : "Sin stock"}
            </span>
          </div>
        </div>
      </div>

      {/* Selector de cantidad y botón de agregar al carrito - Solo para compradores autenticados */}
      {user && isBuyer && product.stock > 0 && (
        <div className="mb-8 space-y-4">
          {/* Selector de cantidad */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-neutral-700">
              Cantidad:
            </span>
            <div className="flex items-center border-2 border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-colors">
              <button
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1 || isAddingToCart}
                className="w-11 h-11 flex items-center justify-center text-neutral-900 font-bold hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Disminuir cantidad"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="w-14 text-center font-bold text-neutral-900 text-lg">
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQuantity}
                disabled={quantity >= product.stock || isAddingToCart}
                className="w-11 h-11 flex items-center justify-center text-neutral-900 font-bold hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Aumentar cantidad"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Botón agregar al carrito */}
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full flex items-center justify-center gap-3 bg-neutral-900 text-white font-semibold py-4 px-6 rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Agregando...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Agregar al carrito</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Mensaje para usuarios no compradores */}
      {user && !isBuyer && (
        <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
          <p className="text-sm text-neutral-600 text-center">
            Solo los compradores pueden agregar productos al carrito
          </p>
        </div>
      )}

      {/* Mensaje para usuarios no autenticados */}
      {!user && (
        <div className="mb-8 p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
          <p className="text-sm text-neutral-600 text-center">
            <a
              href="/login"
              className="font-semibold text-neutral-900 hover:underline"
            >
              Inicia sesión
            </a>{" "}
            para agregar este producto al carrito
          </p>
        </div>
      )}

      {/* Información adicional del vendedor */}
      {product.seller && (
        <div className="mt-auto pt-8 border-t border-neutral-200">
          <h3 className="text-lg font-bold text-neutral-900 mb-4">
            Sobre el vendedor
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-neutral-400 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {product.seller.shop_name}
                </p>
                {product.seller.description && (
                  <p className="text-xs text-neutral-600 mt-1">
                    {product.seller.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-neutral-400 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-neutral-600">
                  {product.seller.business_address}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-neutral-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm text-neutral-600">
                RUC: {product.seller.ruc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="text-sm font-semibold text-neutral-900">
                  {product.seller.rating}
                </span>
              </div>
              <div>
                <span className="text-xs text-neutral-500">Ventas: </span>
                <span className="text-sm font-semibold text-neutral-900">
                  {product.seller.total_sales}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
