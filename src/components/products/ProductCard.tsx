import type { Product } from "../../types/product.types";
import { loadImage } from "../../utils/loadImage";

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  // Función para formatear el precio (el precio viene como string desde el backend)
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numPrice);
  };

  return (
    <div
      className="group cursor-pointer bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
      onClick={handleClick}
    >
      {/* Imagen del producto */}
      <div className="w-full aspect-square bg-neutral-100 flex items-center justify-center overflow-hidden">
        {product.image_path ? (
          <img
            src={loadImage(product.image_path)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400">
            <svg
              className="w-24 h-24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-text mb-2 line-clamp-2 min-h-12">
          {product.name}
        </h3>
        
        {/* Precio */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xl font-bold text-text">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Stock disponible */}
        <p className="text-sm text-muted mt-2">
          {product.seller_name}
        </p>
      </div>
    </div>
  );
};

