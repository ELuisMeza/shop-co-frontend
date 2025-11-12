import { X, SlidersHorizontal, Search } from 'lucide-react';
import { useGetCategories } from '../../hooks/useGetCategories';
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GetProductsParams } from '../../types/product.types';

interface ProductFiltersProps {
  params: GetProductsParams;
  setParams: (params: GetProductsParams) => void;
  searchInput: string;
  setSearchInput: (value: string) => void;
  children: ReactNode;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  params,
  setParams,
  searchInput,
  setSearchInput,
  children,
}) => {
  const { categories } = useGetCategories();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [tempParams, setTempParams] = useState<GetProductsParams>(params);

  // Sincronizar tempParams cuando params cambie externamente
  useEffect(() => {
    setTempParams(params);
  }, [params]);

  const filtersContent = (
    <div className="h-full flex flex-col">
    {/* Header (solo mobile) */}
    <div className="flex items-center justify-between p-6 border-b border-border lg:hidden">
      <h2 className="text-xl font-bold">Filtros</h2>
      <button
        onClick={() => setIsMobileFiltersOpen(false)}
        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  
    {/* Contenido de filtros */}
    <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-bold mb-6 hidden lg:block">Filtros</h2>
  
      {/* Filtro por precio */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted mb-4">
          Rango de Precio
        </h3>
        <div className="space-y-4">
          {/* Inputs de precio */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted mb-1 block">Mínimo</label>
              <input
                type="number"
                placeholder="S/ 0"
                value={tempParams.min_price || ''}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : 0;
                  setTempParams({ ...tempParams, min_price: value });
                }}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Máximo</label>
              <input
                type="number"
                placeholder="S/ 1000"
                value={tempParams.max_price || ''}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : 1000;
                  setTempParams({ ...tempParams, max_price: value });
                }}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground"
              />
            </div>
          </div>
          
          {/* Barra de rango dual */}
          <div className="pt-2">
            <div className="relative h-2">
              {/* Track de fondo */}
              <div className="absolute w-full h-2 bg-neutral-200 rounded-lg"></div>
              
              {/* Track activo (entre los dos valores) */}
              <div 
                className="absolute h-2 bg-foreground rounded-lg"
                style={{
                  left: `${((tempParams.min_price || 0) / 1000) * 100}%`,
                  right: `${100 - ((tempParams.max_price || 1000) / 1000) * 100}%`
                }}
              ></div>
              
              {/* Input range para mínimo */}
              <input
                type="range"
                min="0"
                max="1000"
                value={tempParams.min_price || 0}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value <= (tempParams.max_price || 1000)) {
                    setTempParams({ ...tempParams, min_price: value });
                  }
                }}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:shadow-md"
              />
              
              {/* Input range para máximo */}
              <input
                type="range"
                min="0"
                max="1000"
                value={tempParams.max_price || 1000}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= (tempParams.min_price || 0)) {
                    setTempParams({ ...tempParams, max_price: value });
                  }
                }}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:shadow-md"
              />
            </div>
            
            {/* Etiquetas de valores */}
            <div className="flex justify-between text-xs text-muted mt-3">
              <span>S/ {tempParams.min_price || 0}</span>
              <span>S/ {tempParams.max_price || 1000}</span>
            </div>
          </div>
        </div>
      </div>
  
      {/* Filtro por categorías */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted mb-4">
          Categorías
        </h3>
        
        {/* Categorías seleccionadas como badges */}
        {tempParams.category_ids && tempParams.category_ids.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tempParams.category_ids.map((categoryId) => {
              const category = categories.find(cat => cat.id === categoryId);
              return category ? (
                <span
                  key={categoryId}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-foreground text-background rounded-full text-xs font-medium"
                >
                  {category.name}
                  <button
                    onClick={() => {
                      setTempParams({
                        ...tempParams,
                        category_ids: tempParams.category_ids?.filter(id => id !== categoryId)
                      });
                    }}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ) : null;
            })}
          </div>
        )}
  
        {/* Lista de categorías disponibles */}
        <div className="space-y-1.5">
          {categories.map((category) => {
            const isSelected = tempParams.category_ids?.includes(category.id);
            return (
              <button
                key={category.id}
                onClick={() => {
                  if (isSelected) {
                    // Remover categoría
                    setTempParams({
                      ...tempParams,
                      category_ids: tempParams.category_ids?.filter(id => id !== category.id)
                    });
                  } else {
                    // Agregar categoría
                    setTempParams({
                      ...tempParams,
                      category_ids: [...(tempParams.category_ids || []), category.id]
                    });
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm border ${
                  isSelected
                    ? 'bg-foreground/5 border-foreground/30 text-foreground'
                    : 'border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 text-text'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{category.name}</span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
  
      {/* Botones de acción */}
      <div className="mt-6 space-y-2 pt-4 border-t border-border">
        {/* Botón aplicar filtros */}
        <button
          onClick={() => {
            setParams({ ...tempParams, page: 1 });
            setIsMobileFiltersOpen(false);
          }}
          className="w-full px-4 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium text-sm"
        >
          Aplicar filtros
        </button>
        
        {/* Botón para limpiar filtros */}
        {((tempParams.category_ids && tempParams.category_ids.length > 0) || 
          (tempParams.min_price !== undefined && tempParams.min_price !== 0) || 
          (tempParams.max_price !== undefined && tempParams.max_price !== 0)) && (
          <button
            onClick={() => {
              const clearedParams = { ...tempParams, category_ids: [], min_price: undefined, max_price: undefined };
              setTempParams(clearedParams);
            }}
            className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-sm text-text"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  </div>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* Sidebar de filtros */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-96px)] lg:self-start">
            {/* Botón filtros mobile */}
            <div className="mb-6 lg:hidden">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium text-text hover:bg-neutral-50 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Ver filtros
              </button>
            </div>

            {/* Panel mobile */}
            {isMobileFiltersOpen && (
              <>
                {/* Overlay */}
                <div
                  className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm lg:hidden"
                  onClick={() => setIsMobileFiltersOpen(false)}
                />
                
                {/* Panel deslizable */}
                <div className="fixed left-0 top-0 h-full w-80 bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-out lg:hidden">
                  {filtersContent}
                </div>
              </>
            )}

            {/* Aside desktop */}
            <aside className="hidden lg:flex w-60 bg-background border border-border rounded-xl h-full overflow-hidden">
              {filtersContent}
            </aside>
          </div>
        </div>

        {/* Área de contenido con búsqueda y productos */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          {/* Barra de búsqueda */}
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-4xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Children (productos) */}
          {children}
        </div>
      </div>
    </div>
  );
}