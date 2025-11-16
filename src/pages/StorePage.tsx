import { useState } from 'react';
import type { GetProductsParams } from '../types/product.types';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductCard } from '../components/products/ProductCard';
import { Pagination } from '../components/products/Pagination';
import { useGetProducts } from '../hooks/useGetProducts';
import { useDebounce } from '../hooks/useDebounce';

export const StorePage = () => {

  const [params, setParams] = useState<GetProductsParams>({
    page: 1,
    limit: 12,
    category_ids: [],
    search: '',
    min_price: 0,
    max_price: 0,
  });

  const [searchInput, setSearchInput] = useState('');

  useDebounce(searchInput, (debouncedSearch) => {
    setParams(prev => ({ ...prev, search: debouncedSearch, page: 1 }));
  }, 500);


  const { products, loading, error, pagination } = useGetProducts(params);

  const handlePageChange = (page: number) => {
    setParams(prev => ({ ...prev, page }));
  };

  return (
    <ProductFilters
      params={params}
      setParams={setParams}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
    >
      {/* Mensaje de error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Grid de productos */}
      {loading ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
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
    </ProductFilters>
  );
};
