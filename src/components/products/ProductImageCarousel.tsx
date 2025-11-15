import { useState } from "react";
import type { ProductImage } from "../../types/product.types";
import { loadImage } from "../../utils/loadImage";

interface ProductImageCarouselProps {
  images: ProductImage[];
}

export const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
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
    );
  }

  const mainImage = images[selectedImageIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal */}
      <div className="w-full aspect-square bg-neutral-100 rounded-2xl overflow-hidden">
        <img
          src={loadImage(mainImage.path_file)}
          alt={`Product image ${selectedImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImageIndex === index
                  ? "border-neutral-900 opacity-100"
                  : "border-neutral-200 hover:border-neutral-400 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={loadImage(image.path_file)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

