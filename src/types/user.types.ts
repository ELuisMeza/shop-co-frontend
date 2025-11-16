export interface TypeUser {
  id:               string;
  name:             string;
  last_name_father: string;
  last_name_mother: string;
  email:            string;
  password:         string;
  phone:            string;
  num_document:     string;
  type_document:    string;
  username:         string;
  status:           string;
  role_id:          string;
  role:             TypeRole;
  last_login:       null;
  created_at:       Date;
  modified_at:      Date;
}

export interface UpdateUserProfile {
  name: string;
  last_name_father: string;
  last_name_mother: string;
  phone: string;
}

export interface TypeRole {
  id:          string;
  name:        string;
  description: string;
  created_at:  Date;
  updated_at:  Date;
}

export interface CreateUser {
  name: string;
  last_name_father: string;
  last_name_mother: string;
  phone: string;
  num_document: string;
  type_document: string;
  email: string;
  password: string;
}

export interface CreateSeller extends CreateUser {
  shop_name: string;
  description: string;
  logo_image: File | null;
  ruc: string;
  business_address: string;
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
  logo_image_path?: string;
}

export interface UpdateSellerProfile {
  shop_name: string;
  description?: string;
  business_address: string;
  logo_image?: File | null;
}