import { useForm } from "react-hook-form";
import { useState } from "react";
import { ProductService } from "../../services/product.service";
import { useGetProductDetails } from "../../hooks/useGetProductDetails";
import { useGetCategories } from "../../hooks/useGetCategories";
import toast from "react-hot-toast";
import { Loader2, Upload, X, Image as ImageIcon, Star, AlertCircle, Package, DollarSign, Tag, Power } from "lucide-react";
import type { CreateProduct } from "../../types/product.types";
import { Modal } from "../Modal";
import { useSetDefaultData } from "./hook/useSetDefaultData";

interface Props {
  productId?: string | null;
  onClose: () => void;
  type: "edit" | "add";
}

export const ModalProduct = ({ productId, onClose, type }: Props) => {
  const shouldLoadProduct = type === "edit" && !!productId;

  const { product, loading: productLoading, error: productError } = useGetProductDetails(
    shouldLoadProduct ? productId : ""
  );

  const { categories, loading: categoriesLoading } = useGetCategories();
  const [uploadFiles, setUploadFiles] = useState<{id: string, file: File | string, isMain: boolean}[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [productStatus, setProductStatus] = useState<"active" | "inactive">("active");
  
  const getPreviewUrl = (input: File | string): string => {
    if (input instanceof File) {
      return URL.createObjectURL(input);
    }
    return input;
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<CreateProduct>({
    defaultValues: {
      categories: [],
    },
    mode: "onChange",
  });

  const watchedCategories = watch("categories");

  useSetDefaultData({ type, product, reset, setUploadFiles, setValue });

  // Establecer el estado del producto cuando se carga
  useState(() => {
    if (product?.status) {
      setProductStatus(product.status as "active" | "inactive");
    }
  });

  const addImage = (file: File) => {
    const isFirstImage = uploadFiles.length === 0;
    const newUploadFiles = {
      id: `file_${uploadFiles.length}`,
      file,
      isMain: isFirstImage,
    };
    setUploadFiles((prev) => [...prev, newUploadFiles]);
  }

  const removeImage = (id: string) => {
    const fileToRemove = uploadFiles.find(item => item.id === id);
    const wasMain = fileToRemove?.isMain;

    if(!id.includes("file_")) {
      setImagesToDelete((prev) => [...prev, id]);
    }

    setUploadFiles((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      
      if (wasMain && filtered.length > 0) {
        filtered[0].isMain = true;
      }

      return filtered.map((item, index) => {
        if (item.id.includes("file_")) {
          return {
            ...item,
            id: `file_${index}`,
          };
        }
        return item;
      });
    });
  };

  const setMainImage = (id: string) => {
    setUploadFiles((prev) => prev.map((item) => ({
      ...item,
      isMain: item.id === id,
    })));
  }

  const handleToggleStatus = async () => {
    if (type !== "edit" || !productId) return;
    
    const { success, message, data } = await ProductService.updateProductStatus(productId);
    
    if (success && data?.status) {
      setProductStatus(data.status as "active" | "inactive");
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const onSubmit = async (data: CreateProduct) => {
    if (!data.categories || data.categories.length === 0) {
      toast.error("Debes seleccionar al menos una categoría");
      return;
    }

    if (uploadFiles.length === 0) {
      toast.error("Debes subir al menos una imagen");
      return;
    }

    const hasMainImage = uploadFiles.some(item => item.isMain);
    if (!hasMainImage) {
      toast.error("Debes seleccionar una imagen principal");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("categories", JSON.stringify(data.categories));

    if (uploadFiles && uploadFiles.length > 0) {
      const metadataArray: { is_main: boolean, file_id: string }[] = [];
      
      uploadFiles.forEach((item) => {
        if (item.file instanceof File) {
          formData.append(`${item.id}`, item.file);
        } 
        metadataArray.push({ is_main: item.isMain, file_id: item.id });
      });
      
      if (metadataArray.length > 0) {
        formData.append("metadata", JSON.stringify(metadataArray));
      }
    }

    if (type === "edit") {
      formData.append("deleteImages", JSON.stringify(imagesToDelete));
    }

    let result;
    if (type === "add") {
      result = await ProductService.createProduct(formData);
    } else {
      if (!productId) {
        toast.error("ID de producto no válido");
        return;
      }
      result = await ProductService.updateProduct(productId, formData);
    }

    if (result.success) {
      toast.success(result.message);
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  const modalTitle = type === "add" ? "Agregar Nuevo Producto" : "Editar Producto";
  const buttonText = type === "add" ? "Crear Producto" : "Actualizar Producto";
  const buttonLoadingText = type === "add" ? "Creando..." : "Actualizando...";

  if (type === "edit") {
    if (productLoading) {
      return (
        <Modal isOpen={true} onClose={onClose} title={modalTitle}>
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-foreground" />
              <p className="text-muted">Cargando información del producto...</p>
            </div>
          </div>
        </Modal>
      );
    }

    if (productError || !product) {
      return (
        <Modal isOpen={true} onClose={onClose} title={modalTitle}>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">Error al cargar el producto: {productError}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      );
    }
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={modalTitle}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Estado del producto (solo en modo edición) */}
        {type === "edit" && (
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Power className="w-5 h-5 text-text" />
                <div>
                  <p className="text-sm font-semibold text-text">Estado del Producto</p>
                  <p className="text-xs text-muted mt-0.5">
                    {productStatus === "active" 
                      ? "El producto es visible para los compradores" 
                      : "El producto está oculto en la tienda"
                    }
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  productStatus === "active"
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "bg-white border-2 border-neutral-300 text-text hover:bg-neutral-50"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  productStatus === "active" ? "bg-white" : "bg-neutral-400"
                }`} />
                {productStatus === "active" ? "Activo" : "Inactivo"}
              </button>
            </div>
          </div>
        )}

        {/* Información Básica */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-text uppercase tracking-wide pb-2 border-b border-neutral-200">
            <Package className="w-4 h-4" />
            Información Básica
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-text mb-2">
              Nombre del Producto *
            </label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
              })}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
              placeholder="Ej: Laptop Dell Inspiron 15"
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-text mb-2">
              Descripción *
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "La descripción es requerida",
                minLength: {
                  value: 10,
                  message: "La descripción debe tener al menos 10 caracteres",
                },
              })}
              rows={4}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all resize-none"
              placeholder="Describe tu producto en detalle..."
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Precio y Stock */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-text uppercase tracking-wide pb-2 border-b border-neutral-200">
            <DollarSign className="w-4 h-4" />
            Precio y Stock
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-text mb-2">
                Precio (S/) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register("price", {
                  required: "El precio es requerido",
                  min: {
                    value: 0.01,
                    message: "El precio debe ser mayor a 0",
                  },
                })}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-semibold text-text mb-2">
                Stock *
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                {...register("stock", {
                  required: "El stock es requerido",
                  min: {
                    value: 0,
                    message: "El stock no puede ser negativo",
                  },
                })}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                placeholder="0"
              />
              {errors.stock && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.stock.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Categorías */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-text uppercase tracking-wide pb-2 border-b border-neutral-200">
            <Tag className="w-4 h-4" />
            Categorías
          </div>

          {categoriesLoading ? (
            <div className="flex items-center gap-2 text-muted">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Cargando categorías...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {categories.map((category: { id: string; name: string }) => {
                const isChecked = watchedCategories?.includes(category.id) || false;
                return (
                  <label
                    key={category.id}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                      isChecked
                        ? "border-foreground bg-foreground/5 shadow-sm"
                        : "border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => {
                        const currentCategories = watchedCategories || [];
                        let newCategories: string[];
                        if (e.target.checked) {
                          newCategories = [...currentCategories, category.id];
                        } else {
                          newCategories = currentCategories.filter((id) => id !== category.id);
                        }
                        setValue("categories", newCategories, {
                          shouldValidate: true,
                        });
                      }}
                      className="w-4 h-4 text-foreground border-neutral-300 rounded focus:ring-foreground"
                    />
                    <span className={`text-sm font-medium ${isChecked ? 'text-foreground' : 'text-text'}`}>
                      {category.name}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
          {errors.categories && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.categories.message}
            </p>
          )}
        </div>

        {/* Imágenes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
            <div className="flex items-center gap-2 text-sm font-semibold text-text uppercase tracking-wide">
              <ImageIcon className="w-4 h-4" />
              Imágenes del Producto
            </div>
            <span className="text-xs text-muted font-medium">
              {uploadFiles.length}/5 imágenes
            </span>
          </div>

          {/* Upload Area */}
          <label 
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              uploadFiles.length >= 5 
                ? 'border-neutral-200 bg-neutral-50 cursor-not-allowed opacity-60'
                : 'border-neutral-300 hover:border-foreground hover:bg-neutral-50'
            }`}
          >
            <div className="flex flex-col items-center justify-center py-6">
              <Upload className={`w-10 h-10 mb-3 ${uploadFiles.length >= 5 ? 'text-neutral-400' : 'text-muted'}`} />
              <p className="mb-1 text-sm font-medium text-text">
                {uploadFiles.length >= 5 ? 'Límite alcanzado' : 'Haz clic para subir imágenes'}
              </p>
              <p className="text-xs text-muted">
                PNG, JPG, WEBP (Máx. 5 imágenes, 5MB c/u)
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              disabled={uploadFiles.length >= 5}
              {...register("images")}
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  const totalImages = uploadFiles.length + files.length;
                  if (totalImages > 5) {
                    toast.error("Máximo 5 imágenes permitidas");
                    e.target.value = "";
                    return;
                  }
                }
                register("images").onChange(e);
                addImage(e.target.files?.[0] as File);
                e.target.value = "";
              }}
              className="hidden"
            />
          </label>

          {/* Vista previa de imágenes */}
          {uploadFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-200">
                <Star className="w-4 h-4 text-foreground" />
                Haz clic en una imagen para marcarla como principal
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {uploadFiles.map(({id, file, isMain}, index) => {
                  const imageUrl = getPreviewUrl(file);
                  return (
                    <div 
                      key={id} 
                      className="relative group"
                    >
                      <button
                        type="button"
                        onClick={() => setMainImage(id)}
                        className={`relative w-full rounded-lg overflow-hidden transition-all ${
                          isMain 
                            ? "ring-4 ring-foreground shadow-xl scale-[1.02]" 
                            : "ring-2 ring-neutral-200 hover:ring-foreground/60 hover:scale-[1.02]"
                        }`}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full aspect-square object-cover"
                          />
                        ) : (
                          <div className="w-full aspect-square flex items-center justify-center bg-neutral-100">
                            <Loader2 className="w-6 h-6 animate-spin text-muted" />
                          </div>
                        )}
                        
                        {/* Badge de imagen principal */}
                        {isMain && (
                          <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-foreground text-background text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-lg">
                            <Star className="w-3 h-3 fill-background" />
                            Principal
                          </div>
                        )}

                        {/* Overlay hover */}
                        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center ${
                          isMain ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <div className="text-white text-xs font-semibold bg-foreground/90 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                            Marcar como principal
                          </div>
                        </div>
                      </button>

                      {/* Botón eliminar */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(id);
                        }}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {/* Número de imagen */}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded backdrop-blur-sm">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {uploadFiles.length === 0 && (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-muted shrink-0 mt-0.5" />
                <div className="text-sm text-text">
                  <p className="font-semibold mb-1">Debes subir al menos una imagen</p>
                  <p className="text-muted">La primera imagen se marcará automáticamente como principal.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
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
                {buttonLoadingText}
              </>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};