import { Package, BarChart3, DollarSign } from "lucide-react";
import type { TypeSeller } from "../../types/user.types";
import { formatPrice } from "../../utils/formatPrice";

interface StadisticsProps {
  sellerProfile: TypeSeller;
}

export const Stadistics: React.FC<StadisticsProps> = ({ sellerProfile }) => {
  return (
    <>
      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1 text-text">{sellerProfile?.count_products || 0}</h3>
          <p className="text-sm text-muted">Productos Publicados</p>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1 text-text">
            {sellerProfile?.total_sales || 0}
          </h3>
          <p className="text-sm text-muted">Productos Vendidos</p>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1 text-text">
            {formatPrice(sellerProfile?.money_raised || 0)}
          </h3>
          <p className="text-sm text-muted">Dinero Ganado</p>
        </div>
      </div>
    </>
  );
};
