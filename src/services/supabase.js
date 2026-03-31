const SUPABASE_URL = window.ENV?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.ENV?.VITE_SUPABASE_ANON_KEY || '';

let supabaseClient = null;

export function initSupabase() {
  if (supabaseClient) return supabaseClient;
  
  if (!window.supabase) {
    console.error('Supabase library not loaded');
    return null;
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Configuración de Supabase incompleta. Verifica .env');
    return null;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase initialized with URL:', SUPABASE_URL);
  return supabaseClient;
}

export function getSupabase() {
  if (!supabaseClient) {
    return initSupabase();
  }
  return supabaseClient;
}