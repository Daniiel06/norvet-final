import { createClient } from '@supabase/supabase-js';

// Usamos || '' para que, si la variable no existe, use un texto vacío en lugar de romper la app
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '', 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
