import { useParams } from "react-router-dom";
import { useGetProductDetails } from "../hooks/useGetProductDetails";
import { ProductImageCarousel } from "../components/products/ProductImageCarousel";
import { ProductDetailsInfo } from "../components/products/ProductDetailsInfo";

export const ProductDetailsPage = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Producto no encontrado
          </h2>
          <p className="text-neutral-600">
            El producto que buscas no existe o ha sido eliminado.
          </p>
        </div>
      </div>
    );
  }

  const { product, loading, error } = useGetProductDetails(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mb-4"></div>
          <p className="text-neutral-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Error al cargar el producto
          </h2>
          <p className="text-neutral-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Producto no encontrado
          </h2>
          <p className="text-neutral-600">
            No se pudo cargar la información del producto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sección de imágenes */}
          <div className="w-full">
            {product.images && product.images.length > 0 ? (
              <ProductImageCarousel images={product.images} />
            ) : product.image_path ? (
              <div className="w-full aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                <img
                  src={product.image_path}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-square bg-neutral-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-neutral-400"
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

          {/* Sección de detalles */}
          <div className="w-full flex items-start">
            <ProductDetailsInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};