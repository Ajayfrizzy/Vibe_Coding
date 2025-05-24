import { supabase } from '../lib/supabase';
import { Message, ApiResponse, PaginatedResponse } from '../lib/supabase';

export const getMessages = async (
  userId: string,
  counterpartId: string,
  page = 1,
  pageSize = 20
): Promise<PaginatedResponse<Message>> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('messages')
    .select('*', { count: 'exact' })
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${counterpartId}),and(sender_id.eq.${counterpartId},receiver_id.eq.${userId})`)
    .order('created_at', { ascending: false })
    .range(from, to);

  return {
    data,
    error,
    count,
    page,
    pageSize,
  };
};

export const sendMessage = async (message: Omit<Message, 'id' | 'created_at' | 'read'>): Promise<ApiResponse<Message>> => {
  const { data, error } = await supabase
    .from('messages')
    .insert(message)
    .select()
    .single();

  return { data, error };
};