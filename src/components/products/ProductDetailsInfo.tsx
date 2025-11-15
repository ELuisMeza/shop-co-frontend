import { useState } from "react";
import type { Product } from "../../types/product.types";
import { CartService } from "../../services/cart.service";
import toast from "react-hot-toast";

interface ProductDetailsInfoProps {
  product: Product;
}

export const ProductDetailsInfo = ({ product }: ProductDetailsInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numPrice);
  };

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
    const { success, message, data } = await CartService.addCartItem(product.id, quantity);
    if (success && data) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Información del vendedor */}
      {product.seller && (
        <div>
          <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
            {product.seller.shop_name}
          </p>
        </div>
      )}

      {/* Nombre del producto */}
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
        {product.name}
      </h1>

      {/* Descripción */}
      {product.description && (
        <p className="text-neutral-600 leading-relaxed text-base">
          {product.description}
        </p>
      )}

      {/* Precio */}
      <div className="flex items-center gap-4 flex-wrap">
        <span className="text-3xl font-bold text-neutral-900">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Stock disponible */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-600">
          Stock disponible:
        </span>
        <span className={`text-sm font-semibold ${
          product.stock > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {product.stock} unidades
        </span>
      </div>

      {/* Selector de cantidad y botón de agregar al carrito */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Selector de cantidad */}
        <div className="flex items-center bg-neutral-100 rounded-lg overflow-hidden">
          <button
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1}
            className="w-12 h-12 flex items-center justify-center text-neutral-900 font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-12 text-center font-semibold text-neutral-900">
            {quantity}
          </span>
          <button
            onClick={handleIncreaseQuantity}
            disabled={quantity >= product.stock}
            className="w-12 h-12 flex items-center justify-center text-neutral-900 font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Botón agregar al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-3 bg-neutral-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
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
        </button>
      </div>

      {/* Información adicional del vendedor */}
      {product.seller && (
        <div className="pt-6 border-t border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            Información del vendedor
          </h3>
          <div className="space-y-1 text-sm text-neutral-600">
            <p>
              <span className="font-medium">Tienda:</span> {product.seller.shop_name}
            </p>
            {product.seller.description && (
              <p>
                <span className="font-medium">Descripción:</span> {product.seller.description}
              </p>
            )}
            <p>
              <span className="font-medium">Dirección:</span> {product.seller.business_address}
            </p>
            <p>
              <span className="font-medium">RUC:</span> {product.seller.ruc}
            </p>
            <p>
              <span className="font-medium">Calificación:</span> {product.seller.rating} ⭐
            </p>
            <p>
              <span className="font-medium">Ventas totales:</span> {product.seller.total_sales}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

