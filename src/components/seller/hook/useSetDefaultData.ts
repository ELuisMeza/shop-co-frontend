import { useEffect } from "react";
import type { CreateProduct, TypeProductDetails } from "../../../types/product.types";
import { loadImage } from "../../../utils/loadImage";
import type { UseFormSetValue } from "react-hook-form";

interface Props {
  type: "edit" | "add";
  product: TypeProductDetails | null;
  reset: (data: any) => void;
  setUploadFiles: (files: {id: string, file: File  | string, isMain: boolean}[]) => void;
  setValue: UseFormSetValue<CreateProduct>
}

export const useSetDefaultData = ({ type, product, reset, setUploadFiles, setValue }: Props) => {
  useEffect(() => {

    if (type === "edit" && product) {
      reset({
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: product.stock,
        categories: product.categories || [],
      });

      setValue("categories", product.categories.map((category) => category.id));
      setUploadFiles(product.images.map((img) => ({
        id: img.id,
        file: loadImage(img.path_file),
        isMain: img.is_main,
      })));

    } else if (type === "add") {
      // Limpiar el formulario en modo agregar
      reset({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categories: [],
      });
      setUploadFiles([]);
    }
  }, [product, reset, type]);
};