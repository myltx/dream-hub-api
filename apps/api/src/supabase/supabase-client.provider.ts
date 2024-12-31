import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SupabaseClientProvider = {
  provide: 'SupabaseClient',
  useFactory: (): SupabaseClient => {
    return createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_KEY as string,
    );
  },
};