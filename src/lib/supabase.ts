import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_ENABLED, SUPABASE_URL } from './constants';

/**
 * Supabase client — only initialised when env credentials are present.
 * In local-first mode the rest of the app works fully offline with
 * device storage; enabling Supabase upgrades persistence/auth later.
 */
export const supabase: SupabaseClient | null = SUPABASE_ENABLED
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

export const isCloudEnabled = (): boolean => Boolean(supabase);