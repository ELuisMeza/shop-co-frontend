import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Validar que totalPages sea un número válido y mayor a 1
  if (!totalPages || isNaN(totalPages) || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    const validTotalPages = Math.max(1, Math.floor(totalPages));

    if (validTotalPages <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= validTotalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas con elipsis
      const current = Math.max(1, Math.min(currentPage, validTotalPages));
      
      if (current <= 3) {
        // Al inicio
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(validTotalPages);
      } else if (current >= validTotalPages - 2) {
        // Al final
        pages.push(1);
        pages.push('ellipsis');
        for (let i = validTotalPages - 3; i <= validTotalPages; i++) {
          pages.push(i);
        }
      } else {
        // En el medio
        pages.push(1);
        pages.push('ellipsis');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(validTotalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Botón anterior */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className={`px-3 py-2 rounded-lg border transition-colors ${
          currentPage <= 1
            ? 'border-neutral-200 text-neutral-400 cursor-not-allowed'
            : 'border-neutral-300 text-text hover:bg-neutral-50 hover:border-neutral-400'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Números de página */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-muted">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`min-w-[40px] px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-foreground text-background border-foreground'
                  : 'border-neutral-300 text-text hover:bg-neutral-50 hover:border-neutral-400'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Botón siguiente */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className={`px-3 py-2 rounded-lg border transition-colors ${
          currentPage >= totalPages
            ? 'border-neutral-200 text-neutral-400 cursor-not-allowed'
            : 'border-neutral-300 text-text hover:bg-neutral-50 hover:border-neutral-400'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

