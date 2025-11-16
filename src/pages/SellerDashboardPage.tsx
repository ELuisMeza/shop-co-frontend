import { Store, Package, Plus, Loader2, Edit, Building2, MapPin, FileText, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useGetSellerProfile } from "../hooks/useGetSellerProfile";
import { ModalProduct } from "../components/seller/ModalProduct";
import { ModalSellerInfo } from "../components/seller/ModalSellerInfo";
import type { TypeSeller } from "../types/user.types";
import { ProductCard } from "../components/products/ProductCard";
import { Stadistics } from "../components/seller/Stadistics";
import { loadImage } from "../utils/loadImage";

export const SellerDashboardPage = () => {
  const { sellerProfile, loading, error, setSellerProfile, products } = useGetSellerProfile();
  const [showModalProduct, setShowModalProduct] = useState<{show: boolean, type: "edit" | "add", productId: string | null}>({show: false, type: "add", productId: null});
  const [showModalSellerInfo, setShowModalSellerInfo] = useState(false);

  const handleProfileUpdate = (updatedProfile: TypeSeller) => {
    setSellerProfile(updatedProfile);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted">Cargando información de la tienda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Store className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-text">Gestión de Tienda</h1>
            <p className="text-muted">Administra tu tienda y productos</p>
          </div>
        </div>
      </div>

      {/* Información de la tienda */}
      <div className="mb-8">
        {sellerProfile && (
          <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text">Información de la Tienda</h2>
              <button
                onClick={() => setShowModalSellerInfo(true)}
                className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-text"
              >
                <Edit className="w-4 h-4" />
                Editar Información
              </button>
            </div>
            
            {/* Logo y Nombre de la Tienda */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-neutral-200">
              {sellerProfile.logo_image_path ? (
                <img
                  src={loadImage(sellerProfile.logo_image_path)}
                  alt={`Logo de ${sellerProfile.shop_name}`}
                  className="w-20 h-20 object-cover rounded-xl border border-neutral-300 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 border border-neutral-300">
                  <ImageIcon className="w-10 h-10 text-primary/50" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm text-muted mb-1">Nombre de la Tienda</p>
                <p className="text-xl font-bold text-text">{sellerProfile.shop_name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted mb-1">RUC</p>
                  <p className="text-base font-semibold text-text">{sellerProfile.ruc}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 md:col-span-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted mb-1">Dirección de Negocio</p>
                  <p className="text-base font-semibold text-text">{sellerProfile.business_address}</p>
                </div>
              </div>

              {sellerProfile.description && (
                <div className="flex items-start gap-4 md:col-span-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted mb-1">Descripción</p>
                    <p className="text-base text-text">{sellerProfile.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Estadísticas */}
      <div className="mb-8">
        {sellerProfile && <Stadistics sellerProfile={sellerProfile} />}
      </div>

      {/* Sección de productos */}
      <div className="bg-white border border-border rounded-xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text">Mis Productos</h2>
          <button
            onClick={() => setShowModalProduct({show: true, type: "add", productId: null})}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Producto
          </button>
        </div>

        {products.length > 0 ? (
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
        ) : (
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
        )}
      </div>

      {showModalProduct.show && sellerProfile && (
        <ModalProduct
          type={showModalProduct.type}
          productId={showModalProduct.productId}
          onClose={() => setShowModalProduct({show: false, type: "add", productId: null})}
        />
      )}

      {showModalSellerInfo && sellerProfile && (
        <ModalSellerInfo
          sellerProfile={sellerProfile}
          onClose={() => setShowModalSellerInfo(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

