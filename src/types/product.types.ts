export type GlobalStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'active' | 'inactive' | 'deleted';

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
  name: string;
  description?: string;
  price: string;
  stock: number;
  status: GlobalStatus;
  created_at: Date;
  modified_at: Date;
  image_path?: string; 
  categories?: string[]; 
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

