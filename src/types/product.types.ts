export type GlobalStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  modified_at: Date;
}

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  category?: Category;
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: GlobalStatus;
  created_at: Date;
  modified_at: Date;
  image_url?: string; // Para imágenes de productos
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface CategoriesResponse {
  categories: Category[];
}

