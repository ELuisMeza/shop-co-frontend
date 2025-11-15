export type GlobalStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'active' | 'inactive' | 'deleted';

export interface TypeCategory {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  modified_at: Date;
}

export interface ProductImage {
  id: string;
  filename: string;
  mimetype: string;
  path_file: string;
  parent_id: string;
  parent_type: string;
  is_main: boolean;
  status: GlobalStatus;
  created_at: Date;
}

export interface TypeSeller {
  id: string;
  user_id: string;
  shop_name: string;
  description?: string;
  ruc: string;
  business_address: string;
  rating: string;
  total_sales: number;
  created_at: Date;
  modified_at: Date;
}

export interface TypeProduct {
  id: string;
  seller_id: string;
  seller?: TypeSeller;
  seller_name?: string;
  name: string;
  description?: string;
  price: string;
  stock: number;
  status: GlobalStatus;
  image_path?: string; 
  categories?: string[]; 
}

export interface ProductsResponse {
  products: TypeProduct[];
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
