import { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js';

export function createClientSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
