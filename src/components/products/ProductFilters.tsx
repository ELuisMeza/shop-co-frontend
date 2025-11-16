import { X, SlidersHorizontal, Search, ChevronDown } from 'lucide-react';
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
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);

  // Sincronizar tempParams cuando params cambie externamente
  useEffect(() => {
    setTempParams(params);
  }, [params]);

  const hasActiveFilters = 
    (tempParams.category_ids && tempParams.category_ids.length > 0) || 
    (tempParams.min_price !== undefined && tempParams.min_price > 0) || 
    (tempParams.max_price !== undefined && tempParams.max_price < 1000);

  const filtersContent = (
    <div className="h-full flex flex-col bg-white">
      {/* Header (solo mobile) */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 lg:hidden">
        <div>
          <h2 className="text-lg font-bold text-text">Filtros</h2>
          {hasActiveFilters && (
            <p className="text-xs text-muted mt-0.5">
              {(tempParams.category_ids?.length || 0) + 
               (tempParams.min_price || tempParams.max_price ? 1 : 0)} activos
            </p>
          )}
        </div>
        <button
          onClick={() => setIsMobileFiltersOpen(false)}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label="Cerrar filtros"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
  
      {/* Contenido de filtros */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-6">
          {/* Header desktop */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold text-text">Filtros</h2>
              {hasActiveFilters && (
                <span className="px-2 py-0.5 bg-foreground text-background rounded-full text-xs font-medium">
                  {(tempParams.category_ids?.length || 0) + 
                   (tempParams.min_price || tempParams.max_price ? 1 : 0)}
                </span>
              )}
            </div>
            <p className="text-sm text-muted">Refina tu búsqueda</p>
          </div>

          {/* Filtro por precio */}
          <div className="border-b border-neutral-200 pb-6">
            <button
              onClick={() => setIsPriceExpanded(!isPriceExpanded)}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
                Precio
              </h3>
              <ChevronDown 
                className={`w-4 h-4 text-muted transition-transform duration-200 ${
                  isPriceExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {isPriceExpanded && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Inputs de precio */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-muted mb-1.5 block">
                      Mínimo
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                        S/
                      </span>
                      <input
                        type="number"
                        placeholder="0"
                        value={tempParams.min_price || ''}
                        onChange={(e) => {
                          const value = e.target.value ? Number(e.target.value) : undefined;
                          setTempParams({ ...tempParams, min_price: value });
                        }}
                        className="w-full pl-8 pr-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted mb-1.5 block">
                      Máximo
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                        S/
                      </span>
                      <input
                        type="number"
                        placeholder="1000"
                        value={tempParams.max_price || ''}
                        onChange={(e) => {
                          const value = e.target.value ? Number(e.target.value) : undefined;
                          setTempParams({ ...tempParams, max_price: value });
                        }}
                        className="w-full pl-8 pr-3 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Barra de rango dual */}
                <div className="pt-4 pb-2">
                  <div className="relative h-1.5">
                    {/* Track de fondo */}
                    <div className="absolute w-full h-1.5 bg-neutral-200 rounded-full"></div>
                    
                    {/* Track activo */}
                    <div 
                      className="absolute h-1.5 bg-foreground rounded-full transition-all"
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
                      step="10"
                      value={tempParams.min_price || 0}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= (tempParams.max_price || 1000)) {
                          setTempParams({ ...tempParams, min_price: value });
                        }
                      }}
                      className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    />
                    
                    {/* Input range para máximo */}
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={tempParams.max_price || 1000}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= (tempParams.min_price || 0)) {
                          setTempParams({ ...tempParams, max_price: value });
                        }
                      }}
                      className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    />
                  </div>
                  
                  {/* Etiquetas de valores */}
                  <div className="flex justify-between text-xs font-medium text-muted mt-4">
                    <span>S/ {tempParams.min_price || 0}</span>
                    <span>S/ {tempParams.max_price || 1000}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
  
          {/* Filtro por categorías */}
          <div>
            <button
              onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
                Categorías
              </h3>
              <ChevronDown 
                className={`w-4 h-4 text-muted transition-transform duration-200 ${
                  isCategoriesExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {isCategoriesExpanded && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Categorías seleccionadas como badges */}
                {tempParams.category_ids && tempParams.category_ids.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                    {tempParams.category_ids.map((categoryId) => {
                      const category = categories.find(cat => cat.id === categoryId);
                      return category ? (
                        <span
                          key={categoryId}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-foreground text-background rounded-full text-xs font-medium shadow-sm"
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
                            aria-label={`Remover ${category.name}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
          
                {/* Lista de categorías disponibles */}
                <div className="space-y-1.5 max-h-80 overflow-y-auto custom-scrollbar">
                  {categories.map((category) => {
                    const isSelected = tempParams.category_ids?.includes(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          if (isSelected) {
                            setTempParams({
                              ...tempParams,
                              category_ids: tempParams.category_ids?.filter(id => id !== category.id)
                            });
                          } else {
                            setTempParams({
                              ...tempParams,
                              category_ids: [...(tempParams.category_ids || []), category.id]
                            });
                          }
                        }}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all text-sm font-medium group ${
                          isSelected
                            ? 'bg-foreground text-background shadow-sm'
                            : 'bg-white hover:bg-neutral-50 text-text border border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category.name}</span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                              <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con botones de acción */}
      <div className="p-6 pt-4 border-t border-neutral-200 bg-white space-y-2.5">
        {/* Botón aplicar filtros */}
        <button
          onClick={() => {
            setParams({ ...tempParams, page: 1 });
            setIsMobileFiltersOpen(false);
          }}
          className="w-full px-4 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold text-sm shadow-sm"
        >
          Aplicar filtros
        </button>
        
        {/* Botón para limpiar filtros */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              const clearedParams = { 
                ...tempParams, 
                category_ids: [], 
                min_price: undefined, 
                max_price: undefined 
              };
              setTempParams(clearedParams);
            }}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all font-semibold text-sm text-text"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
        {/* Sidebar de filtros */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-96px)] lg:self-start">
            {/* Botón filtros mobile */}
            <div className="mb-6 lg:hidden">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white border border-neutral-300 rounded-lg font-semibold text-sm text-text hover:bg-neutral-50 hover:border-neutral-400 active:scale-[0.98] transition-all shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filtros</span>
                {hasActiveFilters && (
                  <span className="px-1.5 py-0.5 bg-foreground text-background rounded-full text-xs font-bold min-w-[18px] text-center">
                    {(tempParams.category_ids?.length || 0) + 
                     (tempParams.min_price || tempParams.max_price ? 1 : 0)}
                  </span>
                )}
              </button>
            </div>

            {/* Panel mobile */}
            {isMobileFiltersOpen && (
              <>
                {/* Overlay */}
                <div
                  className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
                  onClick={() => setIsMobileFiltersOpen(false)}
                />
                
                {/* Panel deslizable */}
                <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden animate-in slide-in-from-left duration-300">
                  {filtersContent}
                </div>
              </>
            )}

            {/* Aside desktop */}
            <aside className="hidden lg:flex w-full bg-white border border-neutral-200 rounded-xl h-full overflow-hidden shadow-sm">
              {filtersContent}
            </aside>
          </div>
        </div>

        {/* Área de contenido con búsqueda y productos */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Barra de búsqueda */}
          <div className="w-full">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Children (productos) */}
          {children}
        </div>
      </div>
    </div>
  );
};