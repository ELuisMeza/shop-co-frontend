import { Package, Plus, Search, SlidersHorizontal, X, ChevronDown, Filter, Loader2 } from "lucide-react";
import { ProductCard } from "../products/ProductCard";
import { Pagination } from "../products/Pagination";
import type { GetProductsParams } from "../../types/product.types";
import type { GlobalStatus } from "../../lib/global-states";
import { useState, useMemo, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useGetCategories } from "../../hooks/useGetCategories";
import { useGetMyProducts } from "../../hooks/useGetMyProducts";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  setShowModalProduct: (showModalProduct: {show: boolean, type: "edit" | "add", productId: string | null}) => void;
}

export const MyProducts: React.FC<Props> = ({ setShowModalProduct }) => {
  const [params, setParams] = useState<GetProductsParams>({
    page: 1,
    limit: 12,
    category_ids: [],
    search: '',
    min_price: 0,
    max_price: 0,
    status: undefined,
  });

  // Estado temporal para los filtros (solo se aplica al presionar el botón)
  const [tempParams, setTempParams] = useState<GetProductsParams>({
    page: 1,
    limit: 12,
    category_ids: [],
    search: '',
    min_price: 0,
    max_price: 0,
    status: undefined,
  });

  const [searchInput, setSearchInput] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  const [isStatusExpanded, setIsStatusExpanded] = useState(true);
  
  const { categories } = useGetCategories();
  const { products, loading, error, pagination } = useGetMyProducts(params);

  useDebounce(searchInput, (debouncedSearch) => {
    setParams(prev => ({ ...prev, search: debouncedSearch, page: 1 }));
  }, 500);

  // Sincronizar tempParams cuando params cambie externamente (para mostrar los filtros aplicados al abrir)
  useEffect(() => {
    setTempParams(prev => ({
      ...prev,
      category_ids: params.category_ids || [],
      min_price: params.min_price || 0,
      max_price: params.max_price || 0,
      status: params.status,
    }));
  }, [params.category_ids, params.min_price, params.max_price, params.status]);

  // Calcular precio máximo disponible para el rango (usar un valor fijo o calcularlo de los productos visibles)
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.max(...products.map(p => parseFloat(p.price)), 1000);
  }, [products]);

  const hasActiveFilters = 
    (tempParams.category_ids && tempParams.category_ids.length > 0) || 
    (tempParams.min_price !== undefined && tempParams.min_price > 0) || 
    (tempParams.max_price !== undefined && tempParams.max_price < maxPrice) ||
    (tempParams.status !== undefined);

  const hasAppliedFilters = 
    (params.category_ids && params.category_ids.length > 0) || 
    (params.min_price !== undefined && params.min_price > 0) || 
    (params.max_price !== undefined && params.max_price < maxPrice) ||
    (params.status !== undefined);

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
  };

  const handleApplyFilters = () => {
    setParams(prev => ({
      ...prev,
      category_ids: tempParams.category_ids || [],
      min_price: tempParams.min_price || 0,
      max_price: tempParams.max_price || 0,
      status: tempParams.status,
      page: 1,
    }));
    setIsFiltersOpen(false);
  };

  const handleClearFilters = () => {
    const clearedTempParams = {
      ...tempParams,
      category_ids: [],
      min_price: 0,
      max_price: 0,
      status: undefined,
    };
    setTempParams(clearedTempParams);
    setParams(prev => ({
      ...prev,
      category_ids: [],
      min_price: 0,
      max_price: 0,
      status: undefined,
      page: 1,
    }));
    setIsFiltersOpen(false);
  };

  const filtersContent = (
    <div className="h-full flex flex-col bg-white">
      {/* Header mobile */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200 lg:hidden">
        <div>
          <h2 className="text-lg font-bold text-text">Filtros</h2>
              {hasActiveFilters && (
                <p className="text-xs text-muted mt-0.5">
                  {(tempParams.category_ids?.length || 0) + 
                   (tempParams.min_price !== undefined && tempParams.min_price > 0 ? 1 : 0) +
                   (tempParams.max_price !== undefined && tempParams.max_price < maxPrice ? 1 : 0) +
                   (tempParams.status ? 1 : 0)} activos
                </p>
              )}
        </div>
        <button
          onClick={() => setIsFiltersOpen(false)}
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
                   (tempParams.min_price !== undefined && tempParams.min_price > 0 ? 1 : 0) +
                   (tempParams.max_price !== undefined && tempParams.max_price < maxPrice ? 1 : 0) +
                   (tempParams.status ? 1 : 0)}
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
                          const value = e.target.value ? Number(e.target.value) : 0;
                          setTempParams(prev => ({ ...prev, min_price: value }));
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
                        placeholder={maxPrice.toString()}
                        value={tempParams.max_price || ''}
                        onChange={(e) => {
                          const value = e.target.value ? Number(e.target.value) : 0;
                          setTempParams(prev => ({ ...prev, max_price: value }));
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
                        left: `${((tempParams.min_price || 0) / maxPrice) * 100}%`,
                        right: `${100 - ((tempParams.max_price || maxPrice) / maxPrice) * 100}%`
                      }}
                    ></div>
                    
                    {/* Input range para mínimo */}
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      step="10"
                      value={tempParams.min_price || 0}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= (tempParams.max_price || maxPrice)) {
                          setTempParams(prev => ({ ...prev, min_price: value }));
                        }
                      }}
                      className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    />
                    
                    {/* Input range para máximo */}
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      step="10"
                      value={tempParams.max_price || maxPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= (tempParams.min_price || 0)) {
                          setTempParams(prev => ({ ...prev, max_price: value }));
                        }
                      }}
                      className="absolute w-full h-1.5 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    />
                  </div>
                  
                  {/* Etiquetas de valores */}
                  <div className="flex justify-between text-xs font-medium text-muted mt-4">
                    <span>S/ {tempParams.min_price || 0}</span>
                    <span>S/ {tempParams.max_price || maxPrice}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filtro por categorías */}
          <div className="border-b border-neutral-200 pb-6">
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
                              setTempParams(prev => ({
                                ...prev,
                                category_ids: prev.category_ids?.filter(id => id !== categoryId) || []
                              }));
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
                {categories.length > 0 ? (
                  <div className="space-y-1.5 max-h-80 overflow-y-auto custom-scrollbar">
                    {categories.map((category) => {
                      const isSelected = tempParams.category_ids?.includes(category.id);
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            if (isSelected) {
                              setTempParams(prev => ({
                                ...prev,
                                category_ids: prev.category_ids?.filter(id => id !== category.id) || []
                              }));
                            } else {
                              setTempParams(prev => ({
                                ...prev,
                                category_ids: [...(prev.category_ids || []), category.id]
                              }));
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
                ) : (
                  <p className="text-sm text-muted text-center py-4">No hay categorías disponibles</p>
                )}
              </div>
            )}
          </div>

          {/* Filtro por estado */}
          <div>
            <button
              onClick={() => setIsStatusExpanded(!isStatusExpanded)}
              className="flex items-center justify-between w-full mb-4 group"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
                Estado
              </h3>
              <ChevronDown 
                className={`w-4 h-4 text-muted transition-transform duration-200 ${
                  isStatusExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {isStatusExpanded && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {(['active', 'inactive'] as GlobalStatus[]).map((status) => {
                  const isSelected = tempParams.status === status;
                  return (
                    <button
                      key={status}
                      onClick={() => {
                        setTempParams(prev => ({
                          ...prev,
                          status: isSelected ? undefined : status
                        }));
                      }}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg transition-all text-sm font-medium ${
                        isSelected
                          ? 'bg-foreground text-background shadow-sm'
                          : 'bg-white hover:bg-neutral-50 text-text border border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="capitalize">
                          {status === 'active' ? 'Activos' : 'Inactivos'}
                        </span>
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
                {/* Opción para mostrar todos */}
                {tempParams.status !== undefined && (
                  <button
                    onClick={() => {
                      setTempParams(prev => ({
                        ...prev,
                        status: undefined
                      }));
                    }}
                    className="w-full text-left px-3.5 py-2.5 rounded-lg transition-all text-sm font-medium bg-white hover:bg-neutral-50 text-text border border-neutral-200 hover:border-neutral-300"
                  >
                    <span>Todos</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con botones de acción */}
      <div className="p-6 pt-4 border-t border-neutral-200 bg-white space-y-2.5">
        {/* Botón aplicar filtros */}
        <button
          onClick={handleApplyFilters}
          className="w-full px-4 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all font-semibold text-sm shadow-sm"
        >
          Aplicar filtros
        </button>
        
        {/* Botón para limpiar filtros */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 active:scale-[0.98] transition-all font-semibold text-sm text-text"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm mb-8">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-text">Mis Productos</h2>
        <div className="flex items-center gap-3">
          {/* Botón filtros mobile */}
          <button
            onClick={() => setIsFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-text"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtros</span>
            {hasAppliedFilters && (
              <span className="px-1.5 py-0.5 bg-foreground text-background rounded-full text-xs font-bold min-w-[18px] text-center">
                {(params.category_ids?.length || 0) + 
                 (params.min_price !== undefined && params.min_price > 0 ? 1 : 0) +
                 (params.max_price !== undefined && params.max_price < maxPrice ? 1 : 0) +
                 (params.status ? 1 : 0)}
              </span>
            )}
          </button>
      <button
        onClick={() => setShowModalProduct({show: true, type: "add", productId: null})}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Agregar Producto
      </button>
        </div>
    </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Panel mobile de filtros */}
      <AnimatePresence>
        {isFiltersOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsFiltersOpen(false)}
            />
            
            {/* Panel deslizable */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
              className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden"
            >
              {filtersContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* Sidebar desktop */}
        <AnimatePresence mode="wait">
          {isSidebarVisible && (
            <motion.aside
              initial={{ opacity: 0, width: 0, x: -20 }}
              animate={{ opacity: 1, width: 288, x: 0 }}
              exit={{ opacity: 0, width: 0, x: -20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: 0.3
              }}
              className="hidden lg:flex shrink-0 bg-white border border-neutral-200 rounded-xl h-fit lg:sticky lg:top-24 shadow-sm"
              style={{ overflow: "hidden" }}
            >
              {filtersContent}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Grid de productos */}
        <div className="flex-1">
          {/* Botón para mostrar/ocultar filtros en desktop */}
          <div className="hidden lg:flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-text"
              >
                <Filter className="w-4 h-4" />
                <span>{isSidebarVisible ? 'Ocultar' : 'Mostrar'} Filtros</span>
              </button>
              {hasAppliedFilters && (
                <span className="px-2 py-1 bg-foreground text-background rounded-full text-xs font-medium">
                  {(params.category_ids?.length || 0) + 
                   (params.min_price !== undefined && params.min_price > 0 ? 1 : 0) +
                   (params.max_price !== undefined && params.max_price < maxPrice ? 1 : 0) +
                   (params.status ? 1 : 0)} filtros activos
                </span>
              )}
            </div>
            {products.length > 0 && (
              <p className="text-sm text-muted">
                Mostrando {products.length} de {pagination.total} productos
              </p>
            )}
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
              {error}
            </div>
          )}

          {/* Grid de productos */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted">Cargando productos...</p>
              </div>
            </div>
          ) : products.length === 0 && pagination.total === 0 ? (
      <div className="text-center py-12 text-muted">
        <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No tienes productos publicados aún</p>
        <button
          onClick={() => setShowModalProduct({show: true, type: "add", productId: null})}
          className="mt-4 inline-block text-primary hover:underline"
        >
          Publica tu primer producto
        </button>
      </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No se encontraron productos con los filtros aplicados</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 inline-block text-primary hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isSeller={true} 
                    showModalEdit={() => setShowModalProduct({show: true, type: "edit", productId: product.id})}
                  />
                ))}
              </div>
              
              {/* Paginación */}
              {pagination.totalPages > 0 && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
  </div>
  );
};