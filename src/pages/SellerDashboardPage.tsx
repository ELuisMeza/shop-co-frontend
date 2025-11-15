import { Store, Package, Plus, BarChart3, Settings, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const SellerDashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Store className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Gestión de Tienda</h1>
            <p className="text-muted">Administra tu tienda y productos</p>
          </div>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">0</h3>
          <p className="text-sm text-muted">Productos Publicados</p>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">0</h3>
          <p className="text-sm text-muted">Vistas Totales</p>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">0</h3>
          <p className="text-sm text-muted">Ventas Totales</p>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">-</h3>
          <p className="text-sm text-muted">Estado</p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/seller/products/new"
          className="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Publicar Producto</h3>
              <p className="text-sm text-muted">Agrega un nuevo producto a tu tienda</p>
            </div>
          </div>
        </Link>

        <Link
          to="/seller/products"
          className="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Mis Productos</h3>
              <p className="text-sm text-muted">Gestiona tus productos publicados</p>
            </div>
          </div>
        </Link>

        <Link
          to="/seller/settings"
          className="bg-white border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Configuración</h3>
              <p className="text-sm text-muted">Configura los datos de tu tienda</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Sección de productos recientes */}
      <div className="mt-8 bg-white border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Productos Recientes</h2>
          <Link
            to="/seller/products"
            className="text-sm text-primary hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="text-center py-12 text-muted">
          <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No tienes productos publicados aún</p>
          <Link
            to="/seller/products/new"
            className="mt-4 inline-block text-primary hover:underline"
          >
            Publica tu primer producto
          </Link>
        </div>
      </div>
    </div>
  );
};

