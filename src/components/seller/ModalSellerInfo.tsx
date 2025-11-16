import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { SellerService } from "../../services/seller.service";
import toast from "react-hot-toast";
import { Loader2, Store, MapPin, Building2, Upload, Image as ImageIcon, X, AlertCircle, Check } from "lucide-react";
import type { TypeSeller, UpdateSellerProfile } from "../../types/user.types";
import { Modal } from "../Modal";
import { loadImage } from "../../utils/loadImage";

interface Props {
  sellerProfile: TypeSeller;
  onClose: () => void;
  onUpdate: (updatedProfile: TypeSeller) => void;
}

export const ModalSellerInfo = ({ sellerProfile, onClose, onUpdate }: Props) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<UpdateSellerProfile & { logo_image: FileList | null }>({
    defaultValues: {
      shop_name: sellerProfile.shop_name,
      description: sellerProfile.description || "",
      business_address: sellerProfile.business_address,
      logo_image: null,
    },
    mode: "onChange",
  });

  const logoImage = watch("logo_image");

  useEffect(() => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
    reset({
      shop_name: sellerProfile.shop_name,
      description: sellerProfile.description || "",
      business_address: sellerProfile.business_address,
      logo_image: null,
    });
    setLogoFile(null);
    setLogoPreview(null);
  }, [sellerProfile, reset]);

  useEffect(() => {
    if (logoImage && logoImage.length > 0) {
      const file = logoImage[0];
      
      // Validar tamaño del archivo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("El archivo debe ser menor a 5MB");
        return;
      }

      setLogoFile(file);
      const preview = URL.createObjectURL(file);
      previewRef.current = preview;
      setLogoPreview(preview);
      
      return () => {
        if (previewRef.current === preview) {
          URL.revokeObjectURL(preview);
          previewRef.current = null;
        }
      };
    } else {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
      }
      setLogoFile(null);
      setLogoPreview(null);
    }
  }, [logoImage]);

  const onSubmit = async (data: UpdateSellerProfile & { logo_image: FileList | null }) => {
    try {
      const updateData: UpdateSellerProfile = {
        shop_name: data.shop_name,
        description: data.description,
        business_address: data.business_address,
        logo_image: logoFile,
      };

      const { success, message, data: updatedData } = await SellerService.updateMySellerProfile(updateData);
      
      if (success && updatedData) {
        toast.success("Información de la tienda actualizada correctamente");
        onUpdate(updatedData);
        onClose();
      } else {
        toast.error(message || "Error al actualizar la información de la tienda");
      }
    } catch (error) {
      toast.error("Error al actualizar la información de la tienda");
    }
  };

  const handleRemoveLogo = () => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
    setLogoFile(null);
    setLogoPreview(null);
    reset({
      ...watch(),
      logo_image: null,
    });
  };

  const currentLogoUrl = logoPreview || (sellerProfile.logo_image_path ? loadImage(sellerProfile.logo_image_path) : null);

  return (
    <Modal isOpen={true} onClose={onClose} title="Editar Información de la Tienda" maxWidth="3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Logo de la tienda */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-text uppercase tracking-wide pb-2 border-b border-neutral-200">
            <ImageIcon className="w-4 h-4" />
            Logo de la Tienda
          </div>
          
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Preview del logo */}
            {currentLogoUrl ? (
              <div className="relative group">
                <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-neutral-200 bg-neutral-50">
                  <img
                    src={currentLogoUrl}
                    alt="Logo de la tienda"
                    className="w-full h-full object-cover"
                  />
                </div>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {logoPreview && (
                  <div className="absolute bottom-2 left-2 right-2 bg-foreground/90 text-background text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm text-center">
                    Nueva imagen
                  </div>
                )}
              </div>
            ) : (
              <div className="w-32 h-32 rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-neutral-400" />
              </div>
            )}

            {/* Upload área */}
            <div className="flex-1 w-full">
              <input
                id="logo_image"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                {...register("logo_image")}
              />
              <label
                htmlFor="logo_image"
                className="flex flex-col items-center justify-center gap-3 w-full px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-foreground hover:bg-neutral-50 border-neutral-300"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-muted" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-text mb-1">
                    {currentLogoUrl ? 'Cambiar logo de la tienda' : 'Sube el logo de tu tienda'}
                  </p>
                  <p className="text-xs text-muted">
                    PNG, JPG o JPEG hasta 5MB
                  </p>
                  {logoFile && (
                    <p className="text-xs text-foreground font-medium mt-2 flex items-center justify-center gap-1">
                      <Check className="w-3 h-3" />
                      {logoFile.name}
                    </p>
                  )}
                </div>
              </label>
              {errors.logo_image && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.logo_image.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
            <p className="text-xs text-muted">
              <strong>Consejo:</strong> Usa una imagen cuadrada con fondo transparente para mejores resultados. El logo se mostrará en tu página de tienda y en tus productos.
            </p>
          </div>
        </div>

        {/* Información Básica */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-text uppercase tracking-wide pb-2 border-b border-neutral-200">
            <Store className="w-4 h-4" />
            Información Básica
          </div>

          {/* Nombre de la tienda */}
          <div>
            <label htmlFor="shop_name" className="block text-sm font-semibold text-text mb-2">
              Nombre de la Tienda *
            </label>
            <input
              id="shop_name"
              type="text"
              {...register("shop_name", {
                required: "El nombre de la tienda es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
              })}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
              placeholder="Ej: Mi Tienda Online"
            />
            {errors.shop_name && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.shop_name.message}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-text mb-2">
              Descripción de la Tienda
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all resize-none"
              placeholder="Describe tu tienda, productos que vendes, valores de tu negocio..."
            />
            <p className="mt-1.5 text-xs text-muted">
              Una buena descripción ayuda a los clientes a conocer mejor tu tienda
            </p>
          </div>
        </div>

        {/* Información Fiscal y Legal */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-text uppercase tracking-wide pb-2 border-b border-neutral-200">
            <Building2 className="w-4 h-4" />
            Información Fiscal y Legal
          </div>

          {/* RUC */}
          <div>
            <label htmlFor="ruc" className="block text-sm font-semibold text-text mb-2">
              RUC *
            </label>
            <input
              id="ruc"
              type="text"
              value={sellerProfile.ruc}
              disabled
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
            />
          </div>

          {/* Dirección de negocio */}
          <div>
            <label htmlFor="business_address" className="block text-sm font-semibold text-text mb-2">
              Dirección de Negocio *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                id="business_address"
                type="text"
                {...register("business_address", {
                  required: "La dirección de negocio es requerida",
                  minLength: {
                    value: 5,
                    message: "La dirección debe tener al menos 5 caracteres",
                  },
                })}
                className="w-full pl-11 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                placeholder="Ej: Av. Principal 123, Lima, Perú"
              />
            </div>
            {errors.business_address && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.business_address.message}
              </p>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-200">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 sm:flex-none px-6 py-2.5 border border-neutral-300 rounded-lg text-text font-semibold hover:bg-neutral-50 active:scale-[0.98] transition-all"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-auto px-6 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando cambios...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};