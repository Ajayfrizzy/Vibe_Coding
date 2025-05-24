import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Please connect to Supabase using the "Connect to Supabase" button.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// Base types remain the same, adding utility types:

export type ApiResponse<T> = {
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  count?: number;
  page?: number;
  pageSize?: number;
};


export type User = {
  id: string;
  email: string;
  full_name?: string;
  user_type: 'farmer' | 'buyer';
  location?: string;
  created_at: string;
  avatar_url?: string;
  phone?: string;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  farmer_id: string;
  created_at: string;
  image_url?: string;
  location?: string;
};

export type PriceAlert = {
  id: string;
  product: string;
  min_price: number;
  max_price: number;
  user_id: string;
  created_at: string;
  active: boolean;
};

export type MarketPrice = {
  id: string;
  product: string;
  price: number;
  market: string;
  location: string;
  updated_at: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
};