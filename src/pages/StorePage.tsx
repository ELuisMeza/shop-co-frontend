import { useState, useEffect, useCallback, useRef } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { getProducts, getCategories } from '../services/product.service';
import type { Product, Category } from '../types/product.types';

export const StorePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const limit = 12;
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cargar categorías al montar el componente
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.categories);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };
    loadCategories();
  }, []);

  // Cargar productos
  const loadProducts = useCallback(async (reset = false, currentPage = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit,
        ...(selectedCategory && { category_id: selectedCategory }),
        ...(debouncedSearchQuery && { search: debouncedSearchQuery }),
        status: 'ACTIVE',
      };

      const response = await getProducts(params);
      
      if (reset) {
        setProducts(response.products);
      } else {
        setProducts((prev) => [...prev, ...response.products]);
      }

      setHasMore(response.products.length === limit);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar productos');
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, debouncedSearchQuery, limit]);

  // Cargar productos cuando cambian los filtros o la búsqueda con debounce
  useEffect(() => {
    loadProducts(true, 1);
    setPage(1);
  }, [selectedCategory, debouncedSearchQuery, loadProducts]);

  // Debounce para la búsqueda
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Manejar cambio de búsqueda
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Cargar más productos (scroll infinito)
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadProducts(false, nextPage);
    }
  };

  // Resetear filtros
  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setPage(1);
  };

  return (
    <div className="w-full">
      {/* Barra de búsqueda y filtros */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onReset={handleReset}
        />
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Grid de productos */}
      {loading && products.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted">Cargando productos...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted mb-2">No se encontraron productos</p>
          <p className="text-muted">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      ) : (
        <>
          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Botón "Ver más" o indicador de carga */}
          {hasMore && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-white border border-border rounded-lg font-medium hover:bg-neutral-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Cargando...' : 'Ver más productos'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
