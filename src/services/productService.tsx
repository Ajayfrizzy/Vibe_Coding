import { supabase } from '../lib/supabase';
import { Product, ApiResponse, PaginatedResponse } from '../lib/supabase';

export const getProducts = async (
  page = 1,
  pageSize = 10,
  filters?: Partial<Product>
): Promise<PaginatedResponse<Product>> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        query = query.eq(key, value);
      }
    });
  }

  const { data, error, count } = await query.range(from, to);

  return {
    data,
    error,
    count,
    page,
    pageSize,
  };
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<ApiResponse<Product>> => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  return { data, error };
};

export const updateProduct = async (id: string, updates: Partial<Product>): Promise<ApiResponse<Product>> => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};