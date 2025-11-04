import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import type { Category } from '../types/product.types';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onReset: () => void;
}

export const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onReset,
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Botón de filtros */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-white hover:bg-neutral-50 transition-colors"
      >
        <Filter className="w-5 h-5" />
        <span className="font-medium">Filtros</span>
        {selectedCategory && (
          <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
            1
          </span>
        )}
      </button>

      {/* Panel de filtros */}
      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer clic fuera */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel deslizable desde la izquierda */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="p-6">
              {/* Header del panel */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filtros</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filtro por categorías */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Categorías</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onCategoryChange(null);
                      onReset();
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? 'bg-primary text-white'
                        : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    Todas las categorías
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onCategoryChange(category.id);
                        onReset();
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'bg-neutral-50 hover:bg-neutral-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón para limpiar filtros */}
              {selectedCategory && (
                <button
                  onClick={() => {
                    onCategoryChange(null);
                    onReset();
                  }}
                  className="w-full px-4 py-2 border border-border rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

