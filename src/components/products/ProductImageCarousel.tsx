import { useState } from "react";
import type { ProductImage } from "../../types/product.types";
import { loadImage } from "../../utils/loadImage";

interface ProductImageCarouselProps {
  images: ProductImage[];
}

export const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-200 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-24 h-24 text-neutral-300 mx-auto mb-3"
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
          <p className="text-sm text-neutral-400 font-medium">
            Sin imágenes disponibles
          </p>
        </div>
      </div>
    );
  }

  const mainImage = images[selectedImageIndex] || images[0];

  const handlePrevImage = () => {
    setImageLoading(true);
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setImageLoading(true);
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal */}
      <div className="relative w-full aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 group">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 z-10">
            <div className="w-8 h-8 border-3 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={loadImage(mainImage.path_file)}
          alt={`Imagen del producto ${selectedImageIndex + 1}`}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoading(false)}
        />

        {/* Controles de navegación - Solo si hay múltiples imágenes */}
        {images.length > 1 && (
          <>
            {/* Botón anterior */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-neutral-900 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              aria-label="Imagen anterior"
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
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Botón siguiente */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-neutral-900 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              aria-label="Siguiente imagen"
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
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Indicador de posición */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-neutral-900/80 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => {
                setImageLoading(true);
                setSelectedImageIndex(index);
              }}
              className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-neutral-900 opacity-100 scale-105 shadow-md"
                  : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <img
                src={loadImage(image.path_file)}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

