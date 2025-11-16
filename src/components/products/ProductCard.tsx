import { useNavigate } from "react-router-dom";
import type { TypeProduct } from "../../types/product.types";
import { loadImage } from "../../utils/loadImage";
import { formatPrice } from "../../utils/formatPrice";
import { EyeOff } from "lucide-react";

interface ProductCardProps {
  product: TypeProduct;
  isSeller?: boolean;
  showModalEdit?: () => void;
}

export const ProductCard = ({ product, isSeller = false, showModalEdit }: ProductCardProps) => {
  const navigate = useNavigate();
  const isInactive = product.status === "inactive";

  return (
    <div
      className="group cursor-pointer bg-white border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-neutral-300"
      onClick={() => {
        if (isSeller) {
          showModalEdit?.();
        } else {
          navigate(`/store/product/${product.id}`);
        }
      }}
    >
      {/* Imagen del producto */}
      <div className="relative w-full aspect-square bg-neutral-50 flex items-center justify-center overflow-hidden">
        {product.image_path ? (
          <img
            src={loadImage(product.image_path)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-300">
            <svg
              className="w-20 h-20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        
        {/* Badge de estado inactivo */}
        {isInactive && isSeller && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-neutral-800/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
            <EyeOff className="w-3.5 h-3.5" />
            No publicado
          </div>
        )}

        {/* Badge de stock bajo (solo si está activo) */}
        {!isInactive && product.stock > 0 && product.stock <= 10 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-neutral-700">
            Solo {product.stock} disponibles
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-5">
        {/* Categorías */}
        {product.categories && product.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="inline-block px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-600 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Nombre del producto */}
        <h3 className="text-base font-semibold text-text mb-2 line-clamp-2 min-h-12 leading-snug">
          {product.name}
        </h3>
        
        {/* Vendedor */}
        {!isSeller && (
          <p className="text-sm text-muted mb-3">
            {product.seller_name}
          </p>
        )}

        {/* Precio y stock */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <span className="text-2xl font-bold text-text">
            {formatPrice(product.price)}
          </span>
          
          {isInactive && isSeller ? (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded">
              <EyeOff className="w-3 h-3" />
              Oculto
            </div>
          ) : product.stock > 0 ? (
            <span className="text-xs text-neutral-500 font-medium">
              Stock: {product.stock}
            </span>
          ) : (
            <span className="text-xs text-red-600 font-medium">
              Agotado
            </span>
          )}
        </div>

        {/* Mensaje informativo discreto para productos inactivos */}
        {isInactive && isSeller && (
          <div className="mt-3 pt-3 border-t border-neutral-100">
            <p className="text-xs text-neutral-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
              Este producto no es visible para los compradores
            </p>
          </div>
        )}
      </div>
    </div>
  );
};