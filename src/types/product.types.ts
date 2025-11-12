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
  seller_name: string;
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
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetProductsParams {
  category_ids?: string[];
  search?: string;
  page?: number;
  limit?: number;
  min_price?: number;
  max_price?: number;
}
